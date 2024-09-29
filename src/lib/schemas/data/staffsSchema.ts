import { number, object, string, z } from 'zod';
import { wpImageOptional } from '../wpImageOptional';

export const staffsSchema = object({
  id: number(),
  name: string().min(1),
  description: string().min(1),
  image: wpImageOptional,
  staffPositions: number().array(),
});

export const staffsArraySchema = staffsSchema.array();

export type Staff = z.infer<typeof staffsSchema>;
