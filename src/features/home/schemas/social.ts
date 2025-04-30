import { z } from 'zod';

export const CreateSocialSchema = z.object({
  social: z.string().min(1, { message: 'Social media name is required' }),
  link: z.string().url(),
});

export type CreateSocialDto = z.infer<typeof CreateSocialSchema>;
