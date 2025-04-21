import ProjectCard, {
  Project,
} from '@/features/projects/components/ProjectCard';

const projects: Project[] = [
  {
    id: 1,
    name: 'FishCove',
    status: 'Current',
    imageUrl: '/images/profile.png',
    link: 'https://example.com/project-a',
    memberCount: 5,
    position: 'Owner',
  },
  {
    id: 2,
    name: 'Chubs’ Lounge',
    status: 'Previous',
    imageUrl: '/images/profile.png',
    link: 'https://example.com/project-b',
    memberCount: 3,
    position: 'Owner',
  },
  {
    id: 3,
    name: 'TLJ’s Den',
    status: 'Current',
    imageUrl: '/images/profile.png',
    link: 'https://example.com/project-c',
    memberCount: 8,
    position: 'Manager',
  },
  {
    id: 4,
    name: 'JayHub',
    status: 'Previous',
    imageUrl: '/images/profile.png',
    link: 'https://example.com/project-d',
    memberCount: 2,
    position: 'Member',
  },
  {
    id: 5,
    name: 'Bingus’ Server',
    status: 'Current',
    imageUrl: '/images/profile.png',
    link: 'https://example.com/project-e',
    memberCount: 4,
    position: 'Member',
  },
  {
    id: 6,
    name: 'GirlyBella',
    status: 'Previous',
    imageUrl: '/images/profile.png',
    link: 'https://example.com/project-f',
    memberCount: 6,
    position: 'Moderator',
  },
];

export default function ProjectPage() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-3 gap-12">
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
}
