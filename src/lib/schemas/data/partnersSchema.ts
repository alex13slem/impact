import type { NewsItemWithRelated } from '@/lib/data/news';
import { array, number, object, string, z } from 'zod';
import { wpImageOptional } from '../wpImageOptional';
import type { CharityProgram } from './charityProgramsSchema';

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

export type PartnerWithRelations = Partner & {
  events: NewsItemWithRelated[] | undefined;
  charityProgram: CharityProgram;
};
