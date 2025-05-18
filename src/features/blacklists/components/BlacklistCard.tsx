'use client';

import React, { useState } from 'react';
import { Blacklists } from '../../../../prisma/generated/client';
import { Button } from '@/components/ui/button';
import { removeFromBlacklist } from '../actions/removeFromBlacklist';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface BlacklistCardProps {
  blacklist: Blacklists;
  index: number;
}

const BlacklistCard = ({ blacklist, index }: BlacklistCardProps) => {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleUnblock = async () => {
    setIsRemoving(true);
    const data = await removeFromBlacklist(blacklist.id);

    if (data.error) {
      console.log(data.error);
      toast.error('Error removing user from blacklist');
      setIsRemoving(false);
      return;
    }

    router.refresh();
    setIsRemoving(false);
  };

  return (
    <div className="bg-foreground/5 text-md flex items-center justify-between rounded-md px-4 py-3">
      <div className="flex items-center gap-8">
        <div className="text-muted-foreground">#{index + 1}</div>
        <div className="flex items-center gap-4">
          <div>{blacklist.name}</div>
          <div className="text-muted-foreground">{blacklist.userId}</div>
        </div>
      </div>
      <Button
        disabled={isRemoving}
        variant={'destructive'}
        onClick={handleUnblock}
      >
        Blocked
      </Button>
    </div>
  );
};

export default BlacklistCard;
