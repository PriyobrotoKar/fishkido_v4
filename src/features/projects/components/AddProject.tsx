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
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CreateProjectSchema } from '@/features/home/schemas/project';
import { createProject } from '../actions/createProject';

const AddProjects = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: '',
      status: '',
      position: '',
      invite: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);

    const response = await createProject(data);

    if (!response.data) {
      toast.error('Error creating project');
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
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>Add a new project.</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Project" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  name="position"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Manager" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  name="status"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Current Status</FormLabel>
                        <FormControl>
                          <Input placeholder="Current" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  name="invite"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Invite Link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="http://discord.gg/yourinvite"
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
              Add Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProjects;
