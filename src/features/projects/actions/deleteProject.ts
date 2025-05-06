'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteProject = async (id: string) => {
  try {
    const project = await prisma.project.delete({
      where: { id },
    });

    revalidatePath('/projects');

    return {
      data: project,
    };
  } catch (error) {
    console.error('Error deleting project:', error);
    return {
      error: (error as Error).message,
    };
  }
};
