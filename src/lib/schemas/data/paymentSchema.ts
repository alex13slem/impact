import { object, string, z } from 'zod';

export const paymentSchema = object({
  link: string().url(),
  image: string().url(),
});

export type Payment = z.infer<typeof paymentSchema>;
