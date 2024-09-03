import { object, string, z } from 'zod';

export const wpGallery = object({
  src: string().url(),
  alt: string().min(1),
});

export type WpGallery = z.infer<typeof wpGallery>;
