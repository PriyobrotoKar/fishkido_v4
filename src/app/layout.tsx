import type { Metadata } from 'next';
import './globals.css';
import { clashDisplay, outfit } from '@/fonts/fonts';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Fishkido',
  description:
    "Fishkido.tv is a place where you can live view what I'm listening to, if I'm active or even view my socials. Feel free to use to use the contact page if you want to reach out about anything!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashDisplay.variable} ${outfit.variable} min-h-svh antialiased`}
      >
        <SessionProvider>
          <Toaster richColors />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
