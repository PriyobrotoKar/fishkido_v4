'use server';

import {
  UpdateProjectDto,
  UpdateProjectSchema,
} from '@/features/home/schemas/project';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateProject = async (id: string, data: UpdateProjectDto) => {
  try {
    const parsedData = UpdateProjectSchema.parse(data);

    const project = await prisma.project.update({
      where: { id },
      data: parsedData,
    });

    revalidatePath('/projects');
    revalidatePath('/admin/projects');

    return {
      data: project,
    };
  } catch (error) {
    console.error('Error updating project:', error);
    return {
      error: (error as Error).message,
    };
  }
};
