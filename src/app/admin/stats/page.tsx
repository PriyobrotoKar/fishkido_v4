import { AdminTitle } from '@/components/AdminTitle';
import { getAllSubs } from '@/features/subs/actions/getAllSubs';
import EditSubForm from '@/features/subs/components/EditSubForm';
import SubEditCard from '@/features/subs/components/SubEditCard';
import React from 'react';

export default async function StatsPage() {
  const subs = await getAllSubs();

  if (subs.error) {
    return (
      <div className="space-y-10 text-center">
        <AdminTitle subtitle="Statistics" />
        <div>
          <h1 className="text-2xl font-bold">Error fetching statistics</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-10">
        <AdminTitle subtitle="Statistics" />
        <div className="flex gap-4 px-6">
          <div className="basis-8">#</div>
          <div className="basis-1/6">Name</div>
          <div className="basis-1/6">Subs Gifted</div>
        </div>

        <div className="space-y-4">
          {subs.data?.map((sub, index) => {
            return <EditSubForm sub={sub} index={index} key={sub.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
