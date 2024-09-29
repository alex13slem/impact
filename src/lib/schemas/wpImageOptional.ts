import { boolean, string } from 'zod';

export const wpImageOptional = string().url().or(boolean());
