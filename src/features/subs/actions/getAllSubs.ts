'use server';

import { prisma } from '@/lib/prisma';

export const getAllSubs = async () => {
  try {
    const subs = await prisma.subs.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    return {
      data: subs,
    };
  } catch (error) {
    console.error('Error fetching subs:', error);
    return {
      error: (error as Error).message,
    };
  }
};
