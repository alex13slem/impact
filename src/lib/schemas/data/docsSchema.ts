import { boolean, object, string, z } from 'zod';

const ShowInEnum = z.enum(['landing', 'pomozj-detyam']);

export const docsSchema = object({
  id: z.number(),
  name: string().min(1),
  link: string().url(),
  image: string().url().or(boolean()),
  showIn: ShowInEnum,
});

export const docsArraySchema = docsSchema.array();

export type Docs = z.infer<typeof docsSchema>;
