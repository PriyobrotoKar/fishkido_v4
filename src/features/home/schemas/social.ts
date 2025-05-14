import { z } from 'zod';

export const CreateSocialSchema = z.object({
  icon: z
    .union([z.instanceof(File), z.string()])
    .refine(
      (value) => {
        if (typeof value === 'string') return value.length > 0;
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        return value && validTypes.includes(value.type);
      },
      {
        message: 'File must be a PNG or JPG',
      }
    )
    .refine(
      (value) => {
        if (typeof value === 'string') return true;
        const maxSize = 5 * 1024 * 1024; // 1MB
        return value && value.size <= maxSize;
      },
      {
        message: 'File size must be less than 5MB',
      }
    ),
  social: z.string().min(1, { message: 'Social media name is required' }),
  link: z.string().url(),
});

export type CreateSocialDto = z.infer<typeof CreateSocialSchema>;

export const UpdateSocialSchema = CreateSocialSchema.partial();
export type UpdateSocialDto = z.infer<typeof UpdateSocialSchema>;
