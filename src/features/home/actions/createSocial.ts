'use server';

import { prisma } from '@/lib/prisma';
import { CreateSocialDto, CreateSocialSchema } from '../schemas/social';

export const createSocial = async (dto: CreateSocialDto) => {
  try {
    const parsedData = CreateSocialSchema.parse(dto);

    const social = await prisma.social.create({
      data: {
        name: parsedData.social,
        link: parsedData.link,
      },
    });

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
