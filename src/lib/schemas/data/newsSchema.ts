import { boolean, coerce, number, object, string, z } from "zod";
import { wpGallery } from "../wpGallery";

export const newsSchema = object({
  id: number(),
  title: string().min(1),
  slug: string().min(1),
  date: string(),
  image: string().url().or(z.literal(false)).optional(),
  description: string().or(z.literal(false)).optional(),
  body: string().or(z.literal(false)).optional(),
  gallery: wpGallery.array().or(z.literal(false)).optional(),
  regionId: coerce.number(),
  charityProgramId: coerce.number(),
  wardId: coerce.number().or(z.literal(false)).optional(),
  partnerId: coerce.number().or(z.literal(false)).optional(),
  draft: boolean().optional(),
});

export const newsArraySchema = newsSchema.array();

export type NewsItem = z.infer<typeof newsSchema>;
