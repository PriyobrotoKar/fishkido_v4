import { AdminTitle } from '@/components/AdminTitle';
import RefreshSubsBtn from '@/features/stats/componenets/RefreshSubsBtn';
import { getAllSubs } from '@/features/subs/actions/getAllSubs';
import EditSubForm from '@/features/subs/components/EditSubForm';
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
        <div className="flex gap-4 px-6 text-sm">
          <div className="basis-5">#</div>
          <div className="basis-[18%]">Name</div>
          <div className="flex-1">Subs Gifted</div>
          <RefreshSubsBtn />
        </div>

        <div className="space-y-4 text-sm">
          {subs.data?.map((sub, index) => {
            return <EditSubForm sub={sub} index={index} key={sub.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
