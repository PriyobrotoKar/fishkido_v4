'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const removeFromBlacklist = async (id: string) => {
  try {
    const blacklistedUser = await prisma.blacklists.delete({
      where: {
        id,
      },
    });

    revalidatePath('/admin/blacklists');

    return {
      data: blacklistedUser,
    };
  } catch (error) {
    console.error('Error removing from blacklist:', error);
    return {
      error: (error as Error).message,
    };
  }
};
