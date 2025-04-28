'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import React from 'react';

export type MenuType = 'twitch' | 'discord' | 'query' | 'other';

interface MenuItem {
  name: string;
  slug: MenuType;
}

const MenuItems: MenuItem[] = [
  {
    name: 'Twitch Appeal',
    slug: 'twitch',
  },
  {
    name: 'Discord Appeal',
    slug: 'discord',
  },
  {
    name: 'Query',
    slug: 'query',
  },
  {
    name: 'Other',
    slug: 'other',
  },
];

const Menu = () => {
  const params = useSearchParams();
  const type = params.get('type');

  const activeItem = MenuItems.find((item) => item.slug === type);

  return (
    <div>
      <Accordion type="multiple" defaultValue={['something']} key={type}>
        <AccordionItem value="menu">
          <AccordionTrigger className="data-[state=open]:bg-foreground data-[state=open]:text-background p-4 data-[state=open]:rounded-b-none">
            {activeItem?.name ?? 'Select Topic'}
          </AccordionTrigger>

          <AccordionContent>
            {MenuItems.map((item) => (
              <Link
                key={item.slug}
                href={`/contact?type=${item.slug}`}
                className="bg-foreground/5 hover:bg-foreground/20 block w-full p-4"
              >
                {item.name}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Menu;
