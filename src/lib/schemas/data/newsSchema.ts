import { boolean, number, object, string, coerce } from 'zod';
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
  charityProgramId: coerce.number(),
});

export const newsArraySchema = newsSchema.array();
