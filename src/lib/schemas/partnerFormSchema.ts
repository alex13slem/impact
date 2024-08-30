import { object, string, z } from 'zod';
import { phoneNumberSchema } from './phoneNumberSchema';

export const partnerFormSchema = object({
  name: string({ required_error: 'Обязательное поле' }).min(
    2,
    'Минимальная длина 2 символа',
  ),
  email: string({ required_error: 'Обязательное поле' }).email({
    message: 'Неверный формат почты',
  }),
  phone: phoneNumberSchema,
  organization: string({ required_error: 'Обязательное поле' }).min(
    2,
    'Минимальная длина 2 символа',
  ),
});

export type PartnerFormSchema = z.infer<typeof partnerFormSchema>;
