import { array, number, object, string, z } from 'zod';
import { wpImageOptional } from '../wpImageOptional';

export const partnersSchema = object({
  id: number(),
  name: string().min(1),
  description: string().min(1),
  image: wpImageOptional,
  eventsIds: array(number()).or(string().max(0)),
  charityProgramId: number(),
  wardsIds: array(number()).or(string().max(0)),
});

export const partnersArraySchema = partnersSchema.array();

export type Partner = z.infer<typeof partnersSchema>;
