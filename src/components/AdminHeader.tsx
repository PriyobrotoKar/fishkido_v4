'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  {
    name: 'Home',
    href: '/admin',
  },
  {
    name: 'Projects',
    href: '/admin/projects',
  },
  {
    name: 'Statistics',
    href: '/admin/stats',
  },
  {
    name: 'Blacklist',
    href: '/admin/blacklists',
  },
  {
    name: 'Tickets',
    href: '/admin/tickets',
  },
];

const AdminHeader = () => {
  const path = usePathname();

  return (
    <header className="flex items-center justify-between border-b px-12 py-4">
      <Link href={'/'} className="w-20">
        <Image src="/logo.svg" alt="Logo" width={11} height={16} />
      </Link>

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
                    className="bg-accent absolute left-1/2 h-1 w-2 -translate-x-1/2 translate-y-0.5 rounded-full"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <Button variant={'outline'}>Login</Button>
    </header>
  );
};

export default AdminHeader;
