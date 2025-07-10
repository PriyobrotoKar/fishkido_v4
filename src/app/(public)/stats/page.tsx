import { Separator } from '@/components/ui/separator';
import { getStats } from '@/features/stats/actions/getStats';
import ChannelInfo from '@/features/stats/componenets/ChannelInfo';
import TopBits from '@/features/stats/componenets/TopBits';
import TopGifts from '@/features/stats/componenets/TopGifts';
import React from 'react';

export default async function StatsPage() {
  const data = await getStats();

  return (
    <div className="space-y-12 px-6">
      <ChannelInfo
        profile={data?.profile}
        followers={data?.followers}
        subscribers={data?.subscribers}
      />
      <Separator className="via-border mx-auto max-w-3xl bg-gradient-to-r from-transparent to-transparent" />
      <div className="flex flex-col justify-center gap-10 md:flex-row lg:gap-20 [&>*]:flex-1">
        <TopGifts />
        <TopBits bits={data?.bits} />
      </div>
    </div>
  );
}
