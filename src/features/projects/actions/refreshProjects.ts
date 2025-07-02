'use server';

import { fetchGuild } from '@/lib/discord';
import { prisma } from '@/lib/prisma';

export const refreshProjects = async () => {
  try {
    const projects = await prisma.project.findMany();

    const expiredProjects = projects.filter((project) => {
      const projectExpiresAt = new Date(
        new Date(project.updatedAt).getTime() + 1000 * 60
      );
      return projectExpiresAt < new Date();
    });

    if (expiredProjects.length === 0) {
      return {
        message: 'No projects to refresh',
      };
    }

    await Promise.all(
      expiredProjects.map(async (project) => {
        const guildInfo = await fetchGuild(project.invite);

        return prisma.project.update({
          where: {
            id: project.id,
          },
          data: {
            icon: guildInfo.guild.icon,
            memberCount: guildInfo.approximate_member_count,
            guildId: guildInfo.guild.id,
          },
        });
      })
    );

    console.log('Projects refreshed successfully at ', new Date());

    return {
      message: 'Projects refreshed successfully',
    };
  } catch (error) {
    console.error('Error refreshing projects:', error);
    return {
      error: (error as Error).message,
    };
  }
};
