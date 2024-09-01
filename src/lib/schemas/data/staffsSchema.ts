import { number, object, string, z } from 'zod';

export const staffsSchema = object({
  id: number(),
  name: string().min(1),
  description: string().min(1),
  image: string().url(),
  staffPositions: number().array(),
});

export const staffsArraySchema = staffsSchema.array();

export type Staff = z.infer<typeof staffsSchema>;
