'use server';

import { getUserDetailsByID } from '@/lib/discord';
import { prisma } from '@/lib/prisma';

export const addToBlacklist = async (userId: string) => {
  try {
    const alreadyBlacklisted = await prisma.blacklists.findFirst({
      where: {
        userId,
      },
    });

    if (alreadyBlacklisted) {
      return {
        error: 'User is already blacklisted',
      };
    }

    const { username } = await getUserDetailsByID(userId);

    const blacklistedUser = await prisma.blacklists.create({
      data: {
        userId,
        name: username,
      },
    });

    return {
      data: blacklistedUser,
    };
  } catch (error) {
    console.error('Error adding to blacklist:', error);
    return {
      error: (error as Error).message,
    };
  }
};
