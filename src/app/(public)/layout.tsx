import BgGradient from '@/components/BgGradient';
import Header from '@/components/Header';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="relative min-h-svh">
      <Header session={session} />
      <BgGradient />
      <div className="py-28">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
