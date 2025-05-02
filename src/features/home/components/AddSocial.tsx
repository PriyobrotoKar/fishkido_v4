'use client';

import { Button } from '@/components/ui/button';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateSocialSchema } from '../schemas/social';
import { createSocial } from '../actions/createSocial';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const AddSocial = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof CreateSocialSchema>>({
    resolver: zodResolver(CreateSocialSchema),
    defaultValues: {
      social: '',
      link: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);

    const response = await createSocial(data);

    if (!response.data) {
      toast.error('Error creating social');
    }

    setIsOpen(false);
    form.reset();
    router.refresh();
    setIsSubmitting(false);
  });

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={'secondary'} size={'icon'}>
            <IconPlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="gap-8">
          <DialogHeader>
            <DialogTitle>Add Social</DialogTitle>
            <DialogDescription>Add a new social media link.</DialogDescription>
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
    </div>
  );
};

export default AddSocial;
