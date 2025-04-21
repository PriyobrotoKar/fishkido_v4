import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Projects',
    href: '/projects',
  },
  {
    name: 'Statistics',
    href: '/stats',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b px-12 py-4">
      <div className="w-20">
        <Image src="/logo.svg" alt="Logo" width={11} height={16} />
      </div>

      <nav>
        <ul className="flex gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Button variant={'outline'}>Login</Button>
    </header>
  );
};

export default Header;
