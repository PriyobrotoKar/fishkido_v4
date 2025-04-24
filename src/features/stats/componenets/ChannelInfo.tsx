import { IconHeartFilled, IconStarFilled } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

const ChannelInfo = () => {
  return (
    <div>
      <section className="flex justify-center gap-5">
        <div className="overflow-hidden rounded-full">
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
                <span className="text-foreground">Subscribers</span> 123
              </p>
            </div>
            <div className="flex items-center gap-4 [&>svg]:size-4">
              <IconHeartFilled className="size-4 text-purple-500" />
              <p className="text-muted-foreground">
                <span className="text-foreground">Followers</span> 456
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChannelInfo;
