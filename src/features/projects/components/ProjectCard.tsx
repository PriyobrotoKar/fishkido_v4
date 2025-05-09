import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Project } from '../../../../prisma/generated/client';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="bg-foreground/5 space-y-9 rounded-lg p-4 text-sm">
      <div className="flex items-center gap-4">
        <div>
          <Image
            src={`https://cdn.discordapp.com/icons/${project.guildId}/${project.icon}.png`}
            alt={project.name}
            width={46}
            height={46}
            className="rounded-lg"
          />
        </div>
        <div>
          <h3 className="font-clash text-2xl font-semibold">{project.name}</h3>
          <p className="text-foreground/60">{project.status}</p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <div>Member Count</div>
          <div className="text-foreground/60">{project.memberCount}</div>
        </div>
        <div>
          <div>Position</div>
          <div className="text-foreground/60">{project.position}</div>
        </div>
        <Link href={project.invite}>
          <Button variant={'outline'}>Join</Button>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
