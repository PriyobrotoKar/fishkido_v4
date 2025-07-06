'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateAbout(about: string) {
  try {
    // Validate the input
    if (typeof about !== 'string' || about.trim() === '') {
      throw new Error('About section must be a non-empty string.');
    }

    const existingAbout = await prisma.profile.findFirst();

    let updatedAbout;

    if (!existingAbout) {
      // create a new profile if it doesn't exist
      updatedAbout = await prisma.profile.create({
        data: {
          bio: about,
        },
      });
    } else {
      // update the existing profile
      updatedAbout = await prisma.profile.update({
        where: {
          id: existingAbout.id,
        },
        data: {
          bio: about,
        },
      });
    }

    // Revalidate the path to ensure the updated content is fetched
    revalidatePath('/');

    return {
      data: updatedAbout,
    };
  } catch (error) {
    console.error('Error updating about:', error);
    return {
      error: (error as Error).message,
    };
  }
}
