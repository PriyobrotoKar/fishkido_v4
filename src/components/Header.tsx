'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { usePathname, useRouter } from 'next/navigation';
import { Session } from 'next-auth';

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

interface HeaderProps {
  session: Session | null;
}

const Header = ({ session }: HeaderProps) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between border-b px-12 py-4">
      <div className="w-20">
        <Image src="/logo.svg" alt="Logo" width={11} height={16} />
      </div>

      <nav>
        <ul className="flex gap-10">
          {navLinks.map((link) => {
            const isActive = path === link.href;

            return (
              <li key={link.name} className="relative">
                <Link href={link.href}>{link.name}</Link>
                {isActive && (
                  <motion.div
                    layoutId="active"
                    className="bg-primary absolute left-1/2 h-1 w-2 -translate-x-1/2 translate-y-0.5 rounded-full"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <Button
        disabled={Boolean(session) && !session?.user.isAdmin}
        variant={'outline'}
        onClick={() => {
          router.push('/admin');
        }}
      >
        {session?.user.isAdmin ? 'Admin' : 'Login'}
      </Button>
    </header>
  );
};

export default Header;
