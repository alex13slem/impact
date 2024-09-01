import { boolean, coerce, number, object, string, z } from 'zod';

export const goalsSchema = object({
  id: number(),
  counter: coerce.number().min(1),
  description: string().min(1),
  image: string().url().or(boolean()),
  order: coerce.number().min(0),
});

export type Goal = z.infer<typeof goalsSchema>;

export const goalsArraySchema = goalsSchema.array();
