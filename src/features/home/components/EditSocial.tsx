'use client';
import React, { useState } from 'react';
import { Social } from '../../../../prisma/generated/client';
import { IconPencil, IconX } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UpdateSocialSchema } from '../schemas/social';
import { updateSocial } from '../actions/updateSocial';
import { deleteSocial } from '../actions/deleteSocial';
import { toast } from 'sonner';

const EditSocial = ({ social }: { social: Social }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof UpdateSocialSchema>>({
    resolver: zodResolver(UpdateSocialSchema),
    defaultValues: {
      social: social.name,
      link: social.link,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);

    const response = await updateSocial(data, social.id);
    if (!response.data) {
      console.error('Error updating social:', response.error);
      return;
    }

    setIsOpen(false);
    form.reset({
      ...data,
    });
    router.refresh();
    setIsSubmitting(false);
  });

  const handleDelete = async () => {
    const response = await deleteSocial(social.id);
    if (!response.data) {
      toast.error('Error deleting social');
    }

    router.refresh();
  };

  return (
    <div className="bg-foreground/5 flex gap-4 rounded-lg p-4">
      <div className="basis-1/6">{social.name}</div>
      <div className="flex-1">{social.link}</div>
      <div className="space-x-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <IconPencil />
            </Button>
          </DialogTrigger>
          <DialogContent className="gap-8">
            <DialogHeader>
              <DialogTitle>Edit Social</DialogTitle>
              <DialogDescription>Edit social media link.</DialogDescription>
            </DialogHeader>
            <div>
              <Form {...form}>
                <form className="space-y-4">
                  <FormField
                    name="social"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Social Media</FormLabel>
                          <FormControl>
                            <Input placeholder="Twitch" {...field} />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    name="link"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Social Link</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://twitch.tv/yourusername"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </form>
              </Form>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                size={'lg'}
                className="w-full"
                variant={'secondary'}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Add Social
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant={'ghost'} size={'icon'} onClick={handleDelete}>
          <IconX />
        </Button>
      </div>
    </div>
  );
};

export default EditSocial;
