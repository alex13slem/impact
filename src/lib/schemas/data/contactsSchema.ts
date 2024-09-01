import { object, string, z } from 'zod';
import { phoneNumberSchema } from '../phoneNumberSchema';

export const contactsSchema = object({
  phone: phoneNumberSchema,
  city: string().min(1),
  address: string().min(1),
  postIndex: string().min(1),
  email: string().email(),
  openingHours: string().min(1),
  mapCoords: string().min(1),
  mapLink: string().url(),
});

export type Contacts = z.infer<typeof contactsSchema>;
