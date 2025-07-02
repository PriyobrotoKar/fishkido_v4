import BgGradient from '@/components/BgGradient';
import Header from '@/components/Header';
import { Suspense } from 'react';

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-svh">
      <Header />
      <BgGradient />
      <div className="py-12 md:py-28">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
