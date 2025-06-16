'use client';

import { Button } from '@/components/ui/button';
import { Subs } from '../../../../prisma/generated/client';
import { IconPencil } from '@tabler/icons-react';

interface SubEditCardProps {
  sub: Subs;
  index: number;
}

const SubEditCard = ({ sub, index }: SubEditCardProps) => {
  return (
    <div className="bg-foreground/5 text-md flex items-center justify-between rounded-md px-4 py-3">
      <div className="flex flex-1 items-center gap-8">
        <div className="text-muted-foreground">#{index + 1}</div>
        <div className="basis-1/6">{sub.username}</div>
        <div className="text-muted-foreground">{sub.gifts}</div>
      </div>
      <Button variant={'ghost'}>
        <IconPencil />
      </Button>
    </div>
  );
};

export default SubEditCard;
