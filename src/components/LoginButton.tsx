'use client';
import React from 'react';
import { Button } from './ui/button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IconLock } from '@tabler/icons-react';

const LoginButton = () => {
  const { data: session } = useSession();

  const router = useRouter();
  return (
    <Button
      disabled={Boolean(session) && !session?.user.isAdmin}
      variant={'outline'}
      className="px-2 md:px-4"
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
