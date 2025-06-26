import { z } from 'zod';

export const discordSchema = z.object({
  email: z.string().email(),
  punishmentId: z.string().min(1, { message: 'Punishment ID is required' }),
  appeal: z.string().min(1, { message: 'Appeal is required' }),
});
