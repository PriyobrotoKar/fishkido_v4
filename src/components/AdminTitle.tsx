import React from 'react';
import { Separator } from './ui/separator';

interface AdminHeaderProps {
  subtitle: string;
}

export const AdminTitle = ({ subtitle }: AdminHeaderProps) => {
  return (
    <div className="space-y-10 text-center">
      <div className="space-y-4">
        <h1 className="font-clash text-5xl font-semibold">
          Welcome, AdminUser
        </h1>
        <p className="text-accent">{subtitle}</p>
      </div>
      <Separator className="via-border bg-gradient-to-r from-transparent to-transparent" />
    </div>
  );
};
