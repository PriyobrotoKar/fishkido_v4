import Image from 'next/image';
import React from 'react';
import Activity from './Activity';

const Profile = () => {
  return (
    <section className="mx-auto flex w-fit flex-col items-center justify-center gap-5 md:flex-row">
      <div className="w-fit overflow-hidden rounded-full">
        <Image
          src={'/images/profile.png'}
          alt="Profile Image"
          width={148}
          height={148}
        />
      </div>

      <div>
        <h1 className="font-clash text-display">Fishkido</h1>
        <Activity />
      </div>
    </section>
  );
};

export default Profile;
