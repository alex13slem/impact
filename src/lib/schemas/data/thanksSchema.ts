import { number, object, string, z } from 'zod';

export const thanksSchema = object({
  id: number(),
  title: string().min(1),
  description: string().min(1),
  image: string().url(),
  date: string(),
});
export const thanksArraySchema = thanksSchema.array();
export type Thanks = z.infer<typeof thanksSchema>;
