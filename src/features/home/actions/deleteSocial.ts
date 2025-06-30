'use server';

import { deleteMedia } from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteSocial = async (socialId: string) => {
  try {
    const social = await prisma.social.delete({
      where: {
        id: socialId,
      },
    });

    await deleteMedia(social.icon);

    revalidatePath('/');
    revalidatePath('/admin');

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
