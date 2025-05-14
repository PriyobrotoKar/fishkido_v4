'use client';
import React, { useState } from 'react';
import { Social } from '../../../../prisma/generated/client';
import { IconPencil, IconX } from '@tabler/icons-react';
import { Button, buttonVariants } from '@/components/ui/button';
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
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { cn, uploadMedia } from '@/lib/utils';

const EditSocial = ({ social }: { social: Social }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof UpdateSocialSchema>>({
    resolver: zodResolver(UpdateSocialSchema),
    defaultValues: {
      icon: social.icon,
      social: social.name,
      link: social.link,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);

    if (data.icon && typeof data.icon !== 'string') {
      const res = await uploadMedia(data.icon, social.icon);
      data.icon = res.secure_url;
    }

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
    <div className="bg-foreground/5 flex items-center gap-4 rounded-lg p-2 pr-4">
      <div className="size-10 overflow-hidden">
        <Image
          src={social.icon}
          alt="Social Media Icon"
          width={40}
          height={40}
          className="h-full w-full rounded-sm object-cover"
        />
      </div>
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
                                src={
                                  typeof field.value === 'string'
                                    ? field.value
                                    : URL.createObjectURL(field.value)
                                }
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
                Edit Social
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
