import { Button } from '@/components/ui/button';
import { IconRefresh } from '@tabler/icons-react';
import { revalidatePath } from 'next/cache';
import React from 'react';

const RefreshSubsBtn = () => {
  const handleRefresh = async () => {
    'use server';
    revalidatePath('/stats');
  };

  return (
    <Button onClick={handleRefresh} variant={'secondary'} size={'icon'}>
      <IconRefresh />
    </Button>
  );
};

export default RefreshSubsBtn;
