'use server';

import {
  CreateProjectDto,
  CreateProjectSchema,
} from '@/features/home/schemas/project';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createProject = async (dto: CreateProjectDto) => {
  try {
    const parsedData = CreateProjectSchema.parse(dto);

    const project = await prisma.project.create({
      data: parsedData,
    });

    revalidatePath('/projects');

    return {
      data: project,
    };
  } catch (error) {
    console.error('Error creating project:', error);
    return {
      error: (error as Error).message,
    };
  }
};
