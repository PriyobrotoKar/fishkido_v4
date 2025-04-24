import Image from 'next/image';
import React from 'react';
import Activity from './Activity';

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
        <Activity />
      </div>
    </section>
  );
};

export default Profile;
