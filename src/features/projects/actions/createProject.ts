'use server';

import {
  CreateProjectDto,
  CreateProjectSchema,
} from '@/features/home/schemas/project';
import { fetchGuild } from '@/lib/discord';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createProject = async (dto: CreateProjectDto) => {
  try {
    const parsedData = CreateProjectSchema.parse(dto);

    const guildInfo = await fetchGuild(parsedData.invite);

    const project = await prisma.project.create({
      data: {
        ...parsedData,
        icon: guildInfo.guild.icon,
        memberCount: guildInfo.approximate_member_count,
        guildId: guildInfo.guild.id,
      },
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
