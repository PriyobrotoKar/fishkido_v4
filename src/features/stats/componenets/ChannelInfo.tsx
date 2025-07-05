import { IconHeartFilled, IconStarFilled } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

interface ChannelInfoProps {
  followers?: number;
  subscribers?: number;
}

const ChannelInfo = ({ followers, subscribers }: ChannelInfoProps) => {
  if (!followers || !subscribers) {
    return (
      <div className="space-y-4 rounded-lg px-4 py-7 text-center md:px-10">
        <h1 className="font-clash text-2xl font-semibold">Channel Info</h1>
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div>
      <section className="flex justify-center gap-5">
        <div className="hidden overflow-hidden rounded-full md:block">
          <Image
            src={'/images/twitch.png'}
            alt="Profile Image"
            width={148}
            height={148}
          />
        </div>

        <div>
          <h1 className="font-clash text-display">Twitch</h1>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-4">
              <IconStarFilled className="size-4 text-yellow-500" />
              <p className="text-muted-foreground">
                <span className="text-foreground">Subscribers</span>{' '}
                {subscribers}
              </p>
            </div>
            <div className="flex items-center gap-4 [&>svg]:size-4">
              <IconHeartFilled className="size-4 text-purple-500" />
              <p className="text-muted-foreground">
                <span className="text-foreground">Followers</span> {followers}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChannelInfo;
