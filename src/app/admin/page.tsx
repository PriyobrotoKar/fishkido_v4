import { AdminTitle } from '@/components/AdminTitle';
import { getAbout } from '@/features/home/actions/getAbout';
import { getSocials } from '@/features/home/actions/getSocials';
import AboutDialog from '@/features/home/components/AboutDialog';
import AddSocial from '@/features/home/components/AddSocial';
import EditSocial from '@/features/home/components/EditSocial';
import React from 'react';

export default async function AdminHomePage() {
  const socials = await getSocials();
  const about = await getAbout();

  if (socials.error) {
    return (
      <div className="space-y-10 text-center">
        <AdminTitle subtitle="Home / Socials" />
        <div>
          <h1 className="text-2xl font-bold">Error fetching socials</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <AdminTitle subtitle="Home / Socials" />
      <div className="flex items-center gap-4 px-4 text-sm">
        <div className="basis-[23%]">Social</div>
        <div className="flex-1">Link</div>
        <div className="flex gap-4">
          <AboutDialog profile={about.data} />
          <AddSocial />
        </div>
      </div>
      <div className="space-y-4 text-sm">
        {socials.data?.map((social) => {
          return <EditSocial social={social} key={social.id} />;
        })}
      </div>
    </div>
  );
}
