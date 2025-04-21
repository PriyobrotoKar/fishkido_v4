import { Separator } from '@/components/ui/separator';
import About from '@/features/home/components/About';
import Profile from '@/features/home/components/Profile';
import Socials from '@/features/home/components/Socials';

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl space-y-12 py-28">
      <Profile />
      <Socials />
      <Separator className="via-border bg-gradient-to-r from-transparent to-transparent" />
      <About />
    </div>
  );
}
