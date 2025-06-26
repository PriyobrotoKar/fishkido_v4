import { z } from 'zod';

export const querySchema = z.object({
  email: z.string().email(),
  question: z.string().min(1, { message: 'Question is required' }),
  additionalComments: z.string().optional(),
});
