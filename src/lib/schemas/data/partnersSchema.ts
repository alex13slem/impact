import type { NewsItemWithRelated } from '@/lib/data/news';
import { array, number, object, string, z } from 'zod';
import type { CharityProgram } from './charityProgramsSchema';

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

export type PartnerWithRelations = Partner & {
  events: NewsItemWithRelated[] | undefined;
  charityProgram: CharityProgram;
};
