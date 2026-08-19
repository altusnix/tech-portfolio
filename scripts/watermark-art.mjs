// Regenerate with: node scripts/watermark-art.mjs
// Burns a "@Robyn" watermark into the corner of every art piece using the
// site's real font via satori (layout) + resvg (SVG -> transparent PNG),
// then composites it onto each source image with sharp. Originals in
// src/assets/art-portfolio/ are untouched; watermarked copies go to
// src/assets/art-portfolio-watermarked/ and are used for the lightbox's
// full size image only, not the grid thumbnails.
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const fontsDir = path.join(root, 'node_modules/@fontsource');
const sourceDir = path.join(root, 'src/assets/art-portfolio');
const outDir = path.join(root, 'src/assets/art-portfolio-watermarked');

const instrumentSerif = await readFile(
  path.join(fontsDir, 'instrument-serif/files/instrument-serif-latin-400-normal.woff')
);

const WATERMARK_TEXT = '@Robyn';
const WATERMARK_CANVAS = { width: 600, height: 160 };

// render once at a fixed size; sharp resizes it per image below.
// Stacks a dark, offset copy of the text behind a light copy (a manual
// drop shadow, since satori doesn't support text-shadow) so it stays
// legible on both light and dark art without needing per image tuning.
const textStyle = {
  position: 'absolute',
  width: `${WATERMARK_CANVAS.width}px`,
  height: `${WATERMARK_CANVAS.height}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Instrument Serif',
  fontSize: '96px',
  fontStyle: 'italic',
};

const markup = {
  type: 'div',
  props: {
    style: {
      position: 'relative',
      width: `${WATERMARK_CANVAS.width}px`,
      height: `${WATERMARK_CANVAS.height}px`,
      display: 'flex',
    },
    children: [
      {
        type: 'div',
        props: {
          style: { ...textStyle, top: '4px', left: '4px', color: 'rgba(0, 0, 0, 0.45)' },
          children: WATERMARK_TEXT,
        },
      },
      {
        type: 'div',
        props: {
          style: { ...textStyle, top: 0, left: 0, color: 'rgba(255, 255, 255, 0.75)' },
          children: WATERMARK_TEXT,
        },
      },
    ],
  },
};

const svg = await satori(markup, {
  width: WATERMARK_CANVAS.width,
  height: WATERMARK_CANVAS.height,
  fonts: [{ name: 'Instrument Serif', data: instrumentSerif, weight: 400, style: 'italic' }],
});

const watermarkPng = new Resvg(svg, { fitTo: { mode: 'width', value: WATERMARK_CANVAS.width } })
  .render()
  .asPng();

await mkdir(outDir, { recursive: true });

const files = (await readdir(sourceDir)).filter((f) => /\.(jpe?g)$/i.test(f));

for (const file of files) {
  const inputPath = path.join(sourceDir, file);
  const outputPath = path.join(outDir, file);

  const image = sharp(inputPath);
  const { width } = await image.metadata();
  if (!width) {
    console.warn(`Skipping ${file}: could not read dimensions`);
    continue;
  }

  // watermark spans ~22% of the image width, anchored bottom right with a
  // margin (added as transparent padding so gravity math stays simple)
  const watermarkWidth = Math.round(width * 0.22);
  const margin = Math.round(width * 0.03);
  const resizedWatermark = await sharp(watermarkPng)
    .resize({ width: watermarkWidth })
    .extend({ top: margin, bottom: margin, left: margin, right: margin, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp(inputPath)
    .composite([{ input: resizedWatermark, gravity: 'southeast' }])
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  console.log(`Wrote ${path.relative(root, outputPath)}`);
}

console.log(`Watermarked ${files.length} image(s).`);
