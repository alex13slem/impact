import { object, string, z } from 'zod';
import { wpImageOptional } from '../wpImageOptional';

const ShowInEnum = z.enum([
  'landing',
  'pomozj-detyam',
  'nezhnie-ruki',
  'reports',
]);

export const docsSchema = object({
  id: z.number(),
  name: string().min(1),
  link: string().url(),
  image: wpImageOptional,
  showIn: ShowInEnum,
  order: z.coerce.number().optional(),
});

export const docsArraySchema = docsSchema.array();

export type Docs = z.infer<typeof docsSchema>;
