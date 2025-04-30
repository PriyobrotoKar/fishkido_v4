import { prisma } from '@/lib/prisma';

export const getSocials = async () => {
  try {
    const socials = await prisma.social.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: socials,
    };
  } catch (error) {
    console.error('Error fetching socials:', error);
    return {
      error: (error as Error).message,
    };
  }
};
