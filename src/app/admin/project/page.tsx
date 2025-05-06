import { AdminHeader } from '@/components/AdminHeader';
import { getProjects } from '@/features/projects/actions/getProjects';
import AddProjects from '@/features/projects/components/AddProject';
import EditProject from '@/features/projects/components/EditProject';
import RefreshProjects from '@/features/projects/components/RefreshProjects';

export default async function AdminProjectPage() {
  const projects = await getProjects();

  if (projects.error) {
    return (
      <div className="space-y-10 text-center">
        <AdminHeader subtitle="Edit Projects" />
        <div>
          <h1 className="text-2xl font-bold">Error fetching projects</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <AdminHeader subtitle="Edit Projects" />
      <div className="flex gap-4 px-4">
        <div className="basis-1/6">Name</div>
        <div className="basis-1/6">Position</div>
        <div className="flex-1">Invite</div>
        <div className="flex gap-4">
          <RefreshProjects />
          <AddProjects />
        </div>
      </div>

      <div className="space-y-4">
        {projects.data?.map((project) => {
          return <EditProject project={project} key={project.id} />;
        })}
      </div>
    </div>
  );
}
