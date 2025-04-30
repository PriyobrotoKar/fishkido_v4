import { AdminHeader } from '@/components/AdminHeader';
import { getSocials } from '@/features/home/actions/getSocials';
import AddSocial from '@/features/home/components/AddSocial';
import React from 'react';

export default async function AdminHomePage() {
  const socials = await getSocials();

  if (socials.error) {
    return (
      <div className="space-y-10 text-center">
        <AdminHeader subtitle="Home / Socials" />
        <div>
          <h1 className="text-2xl font-bold">Error fetching socials</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 text-center">
      <AdminHeader subtitle="Home / Socials" />
      <div>
        <AddSocial />
      </div>
      <div>
        {socials.data?.map((social) => {
          return <div key={social.id}>{social.name}</div>;
        })}
      </div>
    </div>
  );
}
