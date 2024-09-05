import { boolean, number, object, string, z } from 'zod';
import { wpGallery } from '../wpGallery';
import { wpImageOptional } from '../wpImageOptional';

export const wardStatusEnum = z.enum(['active', 'inactive']);

export const wardsSchema = object({
  id: number(),
  name: string().min(1),
  dateOfBirth: string(),
  image: wpImageOptional,
  description: string().min(1),
  detailDescription: string().min(1),
  desire: string(),
  diagnosis: string(),
  charityProgramId: number(),
  regionId: number(),
  gallery: wpGallery.array().or(boolean()).optional(),
  status: wardStatusEnum,
});

export const wardsArraySchema = wardsSchema.array();

export type Ward = z.infer<typeof wardsSchema>;
