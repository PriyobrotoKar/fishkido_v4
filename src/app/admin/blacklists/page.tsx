import { AdminTitle } from '@/components/AdminTitle';
import { getAllBlacklists } from '@/features/blacklists/actions/getAllBlacklists';
import AddBlacklist from '@/features/blacklists/components/AddBlacklist';
import BlacklistCard from '@/features/blacklists/components/BlacklistCard';
import React from 'react';

export default async function BlacklistPage() {
  const blacklists = await getAllBlacklists();

  if (blacklists.error) {
    return (
      <div className="space-y-10 text-center">
        <AdminTitle subtitle="Blacklisting" />
        <div>
          <h1 className="text-2xl font-bold">Error fetching blacklists</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <AdminTitle subtitle="Blacklisting" />

      <div className="flex items-center justify-between px-4 pl-16">
        <div className="">Account</div>
        <AddBlacklist />
        <div className="basis-20">Status</div>
      </div>

      <div className="space-y-2">
        {blacklists.data?.map((blacklist, i) => {
          return (
            <BlacklistCard key={blacklist.id} blacklist={blacklist} index={i} />
          );
        })}
      </div>
    </div>
  );
}
