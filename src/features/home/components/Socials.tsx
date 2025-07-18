import React from 'react';
import { getSocials } from '../actions/getSocials';
import Image from 'next/image';

async function Socials() {
  const socials = await getSocials();

  return (
    <div>
      <ul className="bg-foreground/5 mx-auto flex w-fit items-center gap-12 rounded-lg px-7 py-4">
        {socials.data?.map((social, index) => (
          <li key={index} className="transition-transform hover:scale-105">
            <a href={social.link} target="_blank" rel="noopener noreferrer">
              <Image
                src={social.icon}
                alt={social.name}
                width={24}
                height={24}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Socials;
