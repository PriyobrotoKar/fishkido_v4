import { getProjects } from '@/features/projects/actions/getProjects';
import { refreshProjects } from '@/features/projects/actions/refreshProjects';
import ProjectCard from '@/features/projects/components/ProjectCard';

export default async function ProjectPage() {
  const projects = await getProjects();
  refreshProjects();

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-3 gap-12">
      {projects.data?.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
}
