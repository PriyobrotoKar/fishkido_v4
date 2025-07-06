'use server';

import { prisma } from '@/lib/prisma';

export const getAbout = async () => {
  try {
    const about = await prisma.profile.findFirst();

    return {
      data: about,
    };
  } catch (error) {
    console.error('Error fetching about:', error);
    return {
      error: (error as Error).message,
    };
  }
};
