import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.string(),
      author: z.string(),
      category: z.string(),
      excerpt: z.string(),
      coverImage: z.string(),
    }),
  }),
};
