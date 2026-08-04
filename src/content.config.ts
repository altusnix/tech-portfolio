import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    client: z.string(),
    yearStart: z.number(),
    yearEnd: z.number().optional(),        // omit = ongoing
    myRole: z.string(),                     // "Technology Lead"
    crew: z.array(z.object({
      discipline: z.enum([
        'front-end', 'back-end', 'design',
        'qa', 'product', 'content'
      ]),
      count: z.number(),
    })),
    stack: z.array(z.string()),
    problem: z.string().optional(),         // one sentence, what was broken/needed before — omit if not confirmed
    scope: z.string(),                      // one sentence, what was built (the process)
    outcome: z.string().optional(),         // one sentence, what changed — omit if not confirmed
    cover: image(),
    coverAlt: z.string(),                   // required — no decorative covers
    gallery: z.array(z.object({
      image: image(),
      alt: z.string(),
    })).default([]),                        // additional in-context screenshots, beyond the cover
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { projects };
