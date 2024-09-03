import { coerce, number, object, string, z } from 'zod';

export const ourMissionSlideSchema = object({
  id: number(),
  description: string(),
  image: string().url(),
  order: coerce.number().min(0),
});

export const ourMissionSlideArraySchema = ourMissionSlideSchema.array();

export type OurMissionSlide = z.infer<typeof ourMissionSlideSchema>;
