'use client';
import React from 'react';
import { Button } from './ui/button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginButton = () => {
  const { data: session } = useSession();

  const router = useRouter();
  return (
    <Button
      disabled={Boolean(session) && !session?.user.isAdmin}
      variant={'outline'}
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
      {session?.user.isAdmin ? 'Admin' : 'Login'}
    </Button>
  );
};

export default LoginButton;
