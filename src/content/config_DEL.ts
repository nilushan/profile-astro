// import { defineCollection, z } from 'astro:content';

// const projects = defineCollection({
//   type: 'content',
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     period: z.string(),
//     status: z.enum(['completed', 'ongoing', 'archived']).default('completed'),
//     featured: z.boolean().default(false),
//     technologies: z.array(z.string()),
//     achievements: z.array(z.string()),
//     challenges: z.array(z.string()).optional(),
//     outcomes: z.array(z.string()).optional(),
//     image: z.string().optional(),
//     gallery: z.array(z.string()).optional(),
//     github: z.string().optional(),
//     demo: z.string().optional(),
//     client: z.string().optional(),
//     team: z.array(z.string()).optional(),
//     role: z.string().optional(),
//     tags: z.array(z.string()).optional(),
//     category: z.enum(['web', 'mobile', 'cloud', 'iot', 'api', 'infrastructure', 'ai']).optional(),
//     publishDate: z.date(),
//     lastUpdated: z.date().optional(),
//   }),
// });

// const blog = defineCollection({
//   type: 'content',
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     publishDate: z.date(),
//     lastUpdated: z.date().optional(),
//     author: z.string().default('Nilushan Silva'),
//     tags: z.array(z.string()).optional(),
//     category: z.string().optional(),
//     featured: z.boolean().default(false),
//     image: z.string().optional(),
//     draft: z.boolean().default(false),
//   }),
// });

// // Renamed to avoid conflict with Starlight's docs collection
// const knowledge = defineCollection({
//   type: 'content',
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     // category: z.string().optional(),
//     // order: z.number().default(0),
//     // lastUpdated: z.date().optional(),
//     // author: z.string().default('Nilushan Silva'),
//     // tags: z.array(z.string()).optional(),
//     // featured: z.boolean().default(false),
//     // difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
//     // estimatedTime: z.string().optional(),
//     // prerequisites: z.array(z.string()).optional(),
//     // relatedDocs: z.array(z.string()).optional(),
//   }),
// });

// export const collections = {
//   projects,
//   blog,
//   knowledge, // Renamed from 'docs' to avoid Starlight conflict
// };
