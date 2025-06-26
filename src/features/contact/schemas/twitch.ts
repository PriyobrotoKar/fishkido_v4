import { z } from 'zod';

export const twitchSchema = z.object({
  email: z.string().email(),
  twitchName: z.string().min(1, { message: 'Twitch name is required' }),
  appeal: z.string().min(1, { message: 'Appeal is required' }),
});
