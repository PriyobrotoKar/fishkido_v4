import { z } from 'zod';

export const otherSchema = z.object({
  email: z.string().email(),
  twitchName: z.string().optional(),
  subject: z.string().min(1, { message: 'Subject is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
});
