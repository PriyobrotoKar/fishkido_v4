import Header from '@/components/Header';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="py-28">{children}</div>
    </div>
  );
}
