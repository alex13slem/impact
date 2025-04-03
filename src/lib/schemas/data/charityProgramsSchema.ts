import { boolean, coerce, number, object, string, z } from "zod";

export const charityProgramsSchema = object({
  id: number(),
  slug: string().min(1),
  name: string().min(1),
  description: string().min(1),
  image: string().url(),
  order: coerce.number().min(0),
  presentation: string().url().or(z.literal(false)),
});

export const charityProgramsArraySchema = charityProgramsSchema.array();

export type CharityProgram = z.infer<typeof charityProgramsSchema>;
