import Image from 'next/image';
import React from 'react';
import StatusBadge from './StatusBadge';

const Profile = () => {
  return (
    <section className="flex justify-center gap-5">
      <div className="overflow-hidden rounded-full">
        <Image
          src={'/images/profile.png'}
          alt="Profile Image"
          width={148}
          height={148}
        />
      </div>

      <div>
        <h1 className="font-clash text-display">Fishkido</h1>

        <div className="space-y-1.5 text-sm">
          <div className="space-x-5">
            <StatusBadge status="dnd" />
            <span>Currently do not disturb on Discord</span>
          </div>
          <div className="space-x-5">
            <span>
              <Image
                src={'/music.svg'}
                alt="Music Waveform"
                width={25}
                height={10}
                className="inline-block"
              />
            </span>
            <span>Not listening to Spotify</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
