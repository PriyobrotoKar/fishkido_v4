import Image from 'next/image';
import React from 'react';
import NavLinks from './NavLinks';
import LoginButton from './LoginButton';

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

const Header = async () => {
  return (
    <header className="flex items-center justify-between border-b px-4 py-4 md:px-12">
      <div className="md:w-20">
        <Image src="/logo.svg" alt="Logo" width={11} height={16} />
      </div>

      <NavLinks links={navLinks} />

      <LoginButton />
    </header>
  );
};

export default Header;
