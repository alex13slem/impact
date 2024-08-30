import { string } from 'zod';

export const phoneNumberSchema = string().regex(
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
  'Неверный формат номера телефона',
);
