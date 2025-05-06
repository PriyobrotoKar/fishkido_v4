import { z } from 'zod';

export const CreateProjectSchema = z.object({
  name: z.string().min(1, { message: 'Project name is required' }),
  position: z.string().min(1, { message: 'Position is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
  invite: z.string().url(),
});

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;

export const UpdateProjectSchema = CreateProjectSchema.partial();
export type UpdateProjectDto = z.infer<typeof UpdateProjectSchema>;
