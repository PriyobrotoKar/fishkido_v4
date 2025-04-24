import {
  IconBrandDiscordFilled,
  IconBrandX,
  IconBrandTiktokFilled,
  IconBrandTwitch,
  IconBrandKickFilled,
} from '@tabler/icons-react';
import React from 'react';

interface SocialLink {
  url: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    url: 'https://tiktok.com/@thecryptodex',
    icon: <IconBrandTiktokFilled />,
  },
  {
    url: 'https://discord.gg/3k4v7a5',
    icon: <IconBrandDiscordFilled />,
  },
  {
    url: 'https://twitter.com/thecryptodex',
    icon: <IconBrandX />,
  },
  {
    url: 'https://kick.com/@thecryptodex',
    icon: <IconBrandKickFilled />,
  },
  {
    url: 'https://twitch.gg/thecryptodex',
    icon: <IconBrandTwitch />,
  },
];

const Socials = () => {
  return (
    <div>
      <ul className="bg-foreground/5 mx-auto flex w-fit items-center gap-12 rounded-lg px-7 py-4">
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.url}
              target="_blank"
              className="[&>svg]:size-5"
              rel="noopener noreferrer"
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Socials;
