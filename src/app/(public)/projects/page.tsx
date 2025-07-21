import { getProjects } from '@/features/projects/actions/getProjects';
import { refreshProjects } from '@/features/projects/actions/refreshProjects';
import ProjectCard from '@/features/projects/components/ProjectCard';

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectPage() {
  const projects = await getProjects();
  const data = await refreshProjects();

  if (data.error) {
    return (
      <div className="space-y-10 text-center">
        <h1 className="text-2xl font-bold">Error fetching projects</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl auto-rows-fr gap-12 px-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.data?.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
}
