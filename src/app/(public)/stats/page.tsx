import { Separator } from '@/components/ui/separator';
import ChannelInfo from '@/features/stats/componenets/ChannelInfo';
import TopBits from '@/features/stats/componenets/TopBits';
import TopGifts from '@/features/stats/componenets/TopGifts';
import React from 'react';

export default function StatsPage() {
  return (
    <div className="space-y-12">
      <ChannelInfo />
      <Separator className="via-border mx-auto max-w-3xl bg-gradient-to-r from-transparent to-transparent" />
      <div className="flex justify-center gap-32 [&>*]:flex-1">
        <TopGifts />
        <TopBits />
      </div>
    </div>
  );
}
