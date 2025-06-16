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
import { IconPencil } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Subs } from '../../../../prisma/generated/client';
import { UpdateSubSchema } from '../schemas/sub';
import { updateSub } from '../actions/updateSub';

const EditSubForm = ({ sub, index }: { sub: Subs; index: number }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof UpdateSubSchema>>({
    resolver: zodResolver(UpdateSubSchema),
    defaultValues: {
      username: sub.username,
      gifts: sub.gifts,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);

    const response = await updateSub(sub.id, data);

    if (!response.data) {
      toast.error('Error updating Sub');
    }

    setIsOpen(false);
    form.reset({
      ...data,
    });
    router.refresh();
    setIsSubmitting(false);
  });

  return (
    <div className="bg-foreground/5 text-md flex items-center justify-between rounded-md px-4 py-3">
      <div className="flex flex-1 items-center gap-8">
        <div className="text-muted-foreground">#{index + 1}</div>
        <div className="basis-1/6">{sub.username}</div>
        <div className="text-muted-foreground">{sub.gifts}</div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={'ghost'} size={'icon'}>
            <IconPencil />
          </Button>
        </DialogTrigger>
        <DialogContent className="gap-8">
          <DialogHeader>
            <DialogTitle>Edit Sub</DialogTitle>
            <DialogDescription>Edit subscription gifts</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  name="username"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  name="gifts"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Gifts</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Gifts"
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(Number(e.target.value));
                            }}
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
              Edit Sub
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditSubForm;
