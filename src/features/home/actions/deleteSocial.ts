'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteSocial = async (socialId: string) => {
  try {
    const social = await prisma.social.delete({
      where: {
        id: socialId,
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
