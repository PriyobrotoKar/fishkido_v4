'use server';

import { prisma } from '@/lib/prisma';

export const removeFromBlacklist = async (id: string) => {
  try {
    const blacklistedUser = await prisma.blacklists.delete({
      where: {
        id,
      },
    });

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
