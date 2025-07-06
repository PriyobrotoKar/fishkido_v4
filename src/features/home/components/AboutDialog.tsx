'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { updateAbout } from '../actions/updateAbout';
import { toast } from 'sonner';
import { Profile } from '../../../../prisma/generated/client';

interface AboutDialogProps {
  profile?: Profile | null;
}

const AboutDialog = ({ profile }: AboutDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [about, setAbout] = useState<string>(profile?.bio ?? '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const res = await updateAbout(about.trim());

    if (res.error) {
      console.error('Error updating about:', res.error);
      toast.error('Failed to update About Me. Please try again.');
      setIsLoading(false);
      return;
    }

    toast.success('About Me updated successfully!');
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'secondary'}>About Me</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About Me</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Textarea
            className="bg-foreground/10 h-32 resize-none"
            placeholder="Write something about yourself..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <DialogFooter>
            <Button
              disabled={isLoading}
              variant={'secondary'}
              size={'lg'}
              className="w-full"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
