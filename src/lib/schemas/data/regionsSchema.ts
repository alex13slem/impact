import { array, number, object, string, z } from 'zod';

export const regionsSchema = object({
  id: number(),
  slug: string().min(1),
  name: string().min(1),
  mapDescription: array(
    object({
      charityProgramId: number(),
      text: string().min(1),
    }),
  ),
});

export const regionsArraySchema = regionsSchema.array();

export type Region = z.infer<typeof regionsSchema>;
