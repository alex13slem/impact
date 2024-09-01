import { object, string, z } from 'zod';
import { wpImageOptional } from '../wpImageSchema';

const ShowInEnum = z.enum(['landing', 'pomozj-detyam']);

export const docsSchema = object({
  id: z.number(),
  name: string().min(1),
  link: string().url(),
  image: wpImageOptional,
  showIn: ShowInEnum,
});

export const docsArraySchema = docsSchema.array();

export type Docs = z.infer<typeof docsSchema>;
