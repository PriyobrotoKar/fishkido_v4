import AdminHeader from '@/components/AdminHeader';
import BgGradient from '@/components/BgGradient';
import React, { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AdminHeader />
      <BgGradient type="green" />
      <div className="mx-auto max-w-3xl py-28">{children}</div>
    </div>
  );
}
