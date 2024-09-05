import { array, number, object, string } from 'zod';

export const partnersSchema = object({
  id: number(),
  name: string().min(1),
  description: string().min(1),
  image: string().url(),
  eventsIds: array(number()),
});

export const partnersArraySchema = partnersSchema.array();
