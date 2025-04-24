import BgGradient from '@/components/BgGradient';
import Header from '@/components/Header';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-svh">
      <Header />
      <BgGradient />
      <div className="py-28">{children}</div>
    </div>
  );
}
