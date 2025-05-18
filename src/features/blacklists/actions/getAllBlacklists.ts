'use server';

import { prisma } from '@/lib/prisma';

export const getAllBlacklists = async () => {
  try {
    const blacklists = await prisma.blacklists.findMany();

    return {
      data: blacklists,
    };
  } catch (error) {
    console.error('Error fetching blacklists:', error);
    return {
      error: (error as Error).message,
    };
  }
};
