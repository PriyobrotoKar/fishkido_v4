'use server';

import { prisma } from '@/lib/prisma';

export const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany();

    return {
      data: projects,
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      error: (error as Error).message,
    };
  }
};
