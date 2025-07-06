import React from 'react';
import { Separator } from './ui/separator';
import { auth } from '@/lib/auth';

interface AdminHeaderProps {
  subtitle: string;
}

export const AdminTitle = async ({ subtitle }: AdminHeaderProps) => {
  const session = await auth();

  return (
    <div className="space-y-10 text-center">
      <div className="space-y-4">
        <h1 className="font-clash text-5xl font-semibold">
          Welcome, {session?.user.name || 'AdminUser'}
        </h1>
        <p className="text-accent">{subtitle}</p>
      </div>
      <Separator className="via-border bg-gradient-to-r from-transparent to-transparent" />
    </div>
  );
};
