'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconPlus } from '@tabler/icons-react';
import React, { useState } from 'react';
import { addToBlacklist } from '../actions/addToBlacklist';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const AddBlacklist = () => {
  const [userId, setUserId] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);

  const router = useRouter();

  const handleAddBlacklist = async () => {
    if (!userId) return;

    setIsAdding(true);
    const data = await addToBlacklist(userId);

    if (data.error) {
      console.log(data.error);
      toast.error('Error adding user to blacklist');
      setIsAdding(false);
      return;
    }

    router.refresh();
    setUserId('');
    setIsAdding(false);
  };

  return (
    <div className="border-border/20 flex w-80 min-w-0 items-center gap-4 rounded-md border px-3">
      <Input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Paste ID to add user"
      />
      <Button
        disabled={isAdding}
        size={'icon'}
        variant={'secondary'}
        onClick={handleAddBlacklist}
      >
        <IconPlus />
      </Button>
    </div>
  );
};

export default AddBlacklist;
