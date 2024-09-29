import { boolean, coerce, number, object, string, z } from 'zod';
import { wpGallery } from '../wpGallery';

export const newsSchema = object({
  id: number(),
  title: string().min(1),
  slug: string().min(1),
  date: string(),
  image: string().url(),
  description: string().min(1),
  body: string().min(1),
  gallery: wpGallery.array().or(boolean()).optional(),
  regionId: coerce.number(),
  charityProgramId: coerce.number(),
  wardId: coerce.number().or(boolean()).optional(),
  partnerId: coerce.number().or(boolean()).optional(),
  draft: boolean().optional(),
});

export const newsArraySchema = newsSchema.array();

export type NewsItem = z.infer<typeof newsSchema>;
