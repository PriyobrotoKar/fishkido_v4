'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinksProps {
  links: {
    name: string;
    href: string;
  }[];
}

const NavLinks = ({ links }: NavLinksProps) => {
  const path = usePathname();
  return (
    <nav>
      <ul className="flex gap-10">
        {links.map((link) => {
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
  );
};

export default NavLinks;
