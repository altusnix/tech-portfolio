// Regenerate with: node scripts/generate-og-image.mjs
// Renders public/og-image.png (1200x630) using the site's real fonts and
// color tokens via satori (layout) + resvg (SVG -> PNG rasterization).
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const fontsDir = path.join(root, 'node_modules/@fontsource');

const [instrumentSerif, figtreeRegular, figtreeSemibold, dmMono] = await Promise.all([
  readFile(path.join(fontsDir, 'instrument-serif/files/instrument-serif-latin-400-normal.woff')),
  readFile(path.join(fontsDir, 'figtree/files/figtree-latin-400-normal.woff')),
  readFile(path.join(fontsDir, 'figtree/files/figtree-latin-600-normal.woff')),
  readFile(path.join(fontsDir, 'dm-mono/files/dm-mono-latin-400-normal.woff')),
]);

const COLOR_PLUM = '#3A1F3D';
const COLOR_BONE = '#E9EBE8';
const COLOR_BRASS = '#B08A3E';

const markup = {
  type: 'div',
  props: {
    style: {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: COLOR_PLUM,
      padding: '90px',
      fontFamily: 'Figtree',
    },
    children: [
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            fontFamily: 'DM Mono',
            fontSize: '22px',
            letterSpacing: '3px',
            color: COLOR_BRASS,
            textTransform: 'uppercase',
            marginBottom: '28px',
          },
          children: 'Technology Leadership × Creative Practice',
        },
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            fontFamily: 'Instrument Serif',
            fontSize: '104px',
            color: COLOR_BONE,
            lineHeight: 1,
            marginBottom: '32px',
          },
          children: 'Robyn Stokes',
        },
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            fontFamily: 'Figtree',
            fontWeight: 600,
            fontSize: '34px',
            color: COLOR_BONE,
            lineHeight: 1.3,
            maxWidth: '920px',
          },
          children: 'From government platforms to gallery walls.',
        },
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            fontFamily: 'Figtree',
            fontSize: '26px',
            color: COLOR_BONE,
            opacity: 0.75,
            marginTop: '20px',
          },
          children: 'Technology Lead — 20+ years leading cross-functional teams',
        },
      },
    ],
  },
};

const svg = await satori(markup, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Instrument Serif', data: instrumentSerif, weight: 400, style: 'normal' },
    { name: 'Figtree', data: figtreeRegular, weight: 400, style: 'normal' },
    { name: 'Figtree', data: figtreeSemibold, weight: 600, style: 'normal' },
    { name: 'DM Mono', data: dmMono, weight: 400, style: 'normal' },
  ],
});

const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
const png = resvg.render().asPng();

const outPath = path.join(root, 'public/og-image.png');
await writeFile(outPath, png);
console.log(`Wrote ${outPath}`);
