import { IconBrandDiscordFilled } from '@tabler/icons-react';
import React from 'react';
import { getSocials } from '../actions/getSocials';

// const socialLinks: SocialLink[] = [
//   {
//     url: 'https://tiktok.com/@thecryptodex',
//     icon: <IconBrandTiktokFilled />,
//   },
//   {
//     url: 'https://discord.gg/3k4v7a5',
//     icon: <IconBrandDiscordFilled />,
//   },
//   {
//     url: 'https://twitter.com/thecryptodex',
//     icon: <IconBrandX />,
//   },
//   {
//     url: 'https://kick.com/@thecryptodex',
//     icon: <IconBrandKickFilled />,
//   },
//   {
//     url: 'https://twitch.gg/thecryptodex',
//     icon: <IconBrandTwitch />,
//   },
// ];
//
async function Socials() {
  const socials = await getSocials();

  return (
    <div>
      <ul className="bg-foreground/5 mx-auto flex w-fit items-center gap-12 rounded-lg px-7 py-4">
        {socials.data?.map((social, index) => (
          <li key={index}>
            <a
              href={social.link}
              target="_blank"
              className="[&>svg]:size-5"
              rel="noopener noreferrer"
            >
              <IconBrandDiscordFilled />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Socials;
