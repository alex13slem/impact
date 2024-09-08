import { array, number, object, string, z } from 'zod';

export const partnersSchema = object({
  id: number(),
  name: string().min(1),
  description: string().min(1),
  image: string().url(),
  eventsIds: array(number()).or(string()),
  charityProgramId: number(),
});

export const partnersArraySchema = partnersSchema.array();

export type Partner = z.infer<typeof partnersSchema>;
