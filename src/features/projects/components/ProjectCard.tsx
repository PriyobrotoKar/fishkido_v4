import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface Project {
  id: number;
  name: string;
  status: 'Current' | 'Previous';
  imageUrl: string;
  link: string;
  memberCount: number;
  position: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="bg-foreground/10 space-y-9 rounded-lg p-4 text-sm">
      <div className="flex items-center gap-4">
        <div>
          <Image
            src={project.imageUrl}
            alt={project.name}
            width={46}
            height={46}
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
        <Link href={project.link}>
          <Button variant={'outline'}>Join</Button>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
