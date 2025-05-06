'use server';

import { prisma } from '@/lib/prisma';
import { UpdateSocialDto, UpdateSocialSchema } from '../schemas/social';
import { revalidatePath } from 'next/cache';

export const updateSocial = async (dto: UpdateSocialDto, socialId: string) => {
  try {
    const parsedData = UpdateSocialSchema.parse(dto);

    const social = await prisma.social.update({
      where: {
        id: socialId,
      },
      data: {
        name: parsedData.social,
        link: parsedData.link,
      },
    });

    revalidatePath('/');

    return {
      data: social,
    };
  } catch (error) {
    console.error('Error creating social:', error);
    return {
      error: (error as Error).message,
    };
  }
};
