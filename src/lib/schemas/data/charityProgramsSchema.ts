import { coerce, number, object, string, z } from 'zod';

export const charityProgramsSchema = object({
  id: number(),
  slug: string().min(1),
  name: string().min(1),
  description: string().min(1),
  image: string().url(),
  order: coerce.number().min(0),
});

export const charityProgramsArraySchema = charityProgramsSchema.array();

export type CharityProgram = z.infer<typeof charityProgramsSchema>;
