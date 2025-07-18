'use client';
import React from 'react';
import { Button } from './ui/button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IconLock } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const LoginButton = () => {
  const { data: session } = useSession();

  const router = useRouter();
  return (
    <Button
      disabled={Boolean(session) && !session?.user.isAdmin}
      variant={'outline'}
      className={cn(
        'px-2 md:px-4',
        session && 'border-accent text-accent',
        session?.user.isAdmin && 'hover:bg-green-500/20'
      )}
      onClick={() => {
        if (!session) {
          signIn('discord', {
            redirectTo: '/admin',
          });
          return;
        }
        router.push('/admin');
      }}
    >
      <span className="hidden md:inline-block">
        {session?.user.isAdmin ? 'Admin' : 'Login'}
      </span>
      <span className="md:hidden">
        <IconLock />
      </span>
    </Button>
  );
};

export default LoginButton;
