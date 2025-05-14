'use client';

import { Button, buttonVariants } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import { cn, uploadMedia } from '@/lib/utils';
import Image from 'next/image';

const AddSocial = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof CreateSocialSchema>>({
    resolver: zodResolver(CreateSocialSchema),
    defaultValues: {
      icon: undefined,
      social: '',
      link: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      if (typeof data.icon === 'string') {
        throw new Error('Icon must be a file');
      }

      const res = await uploadMedia(data.icon);

      const response = await createSocial({
        ...data,
        icon: res.secure_url,
      });

      if (!response.data) {
        toast.error('Error creating social');
      }

      setIsOpen(false);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
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
                  name="icon"
                  render={({ field }) => {
                    const { name } = field;
                    return (
                      <FormItem className="h-12 gap-4 focus-within:ring-0">
                        <FormLabel htmlFor="">Icon</FormLabel>
                        <Label
                          htmlFor={field.name}
                          className={cn(
                            buttonVariants({
                              variant: 'secondary',
                            }),
                            'min-w-fit self-center border-none'
                          )}
                        >
                          Upload
                        </Label>
                        {field.value && (
                          <Button
                            type="button"
                            variant={'destructive'}
                            className="self-center"
                            onClick={() => {
                              field.onChange(null);
                            }}
                          >
                            Remove
                          </Button>
                        )}
                        <FormControl>
                          <Input
                            type="file"
                            hidden
                            id={name}
                            {...field.ref}
                            onChange={(e) =>
                              e.target.files &&
                              field.onChange(e.target.files[0])
                            }
                          />
                        </FormControl>
                        {field.value && (
                          <div className="ml-auto aspect-square h-full overflow-hidden p-2">
                            <Image
                              src={URL.createObjectURL(field.value)}
                              alt="icon"
                              width={32}
                              height={32}
                              className="h-full w-full rounded-sm object-cover"
                            />
                          </div>
                        )}
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
