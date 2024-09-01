import { coerce, number, object, string, z } from 'zod';

export const staffsPositionSchema = object({
  id: number(),
  name: string().min(1),
  order: coerce.number().min(0),
});

export const staffsPositionArraySchema = staffsPositionSchema.array();

export type StaffsPosition = z.infer<typeof staffsPositionSchema>;
