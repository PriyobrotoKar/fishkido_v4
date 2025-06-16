import { z } from 'zod';

export const UpdateSubSchema = z.object({
  username: z.string().optional(),
  gifts: z
    .number()
    .min(0, { message: 'Gifts must be a non-negative number' })
    .optional(),
});

export type UpdateSubDto = z.infer<typeof UpdateSubSchema>;
