import { object, string, z } from 'zod';

export const siteSeoSchema = object({
  slug: string().min(1),
  name: string().min(1),
  description: string().min(1),
  image: string().url(),
});

export const siteSeoArraySchema = siteSeoSchema.array();

export type SiteSeo = z.infer<typeof siteSeoSchema>;
