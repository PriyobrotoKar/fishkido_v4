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
import { IconPencil, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { UpdateProjectSchema } from '@/features/home/schemas/project';
import { Project } from '../../../../prisma/generated/client';
import { updateProject } from '../actions/updateProject';
import { deleteProject } from '../actions/deleteProject';
import Image from 'next/image';

const EditProject = ({ project }: { project: Project }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof UpdateProjectSchema>>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      name: project.name,
      status: project.status,
      position: project.position,
      invite: project.invite,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);

    const response = await updateProject(project.id, data);

    if (!response.data) {
      toast.error('Error updating project');
    }

    setIsOpen(false);
    form.reset({
      ...data,
    });
    router.refresh();
    setIsSubmitting(false);
  });

  const handleDelete = async () => {
    const response = await deleteProject(project.id);
    if (!response.data) {
      toast.error('Error deleting project');
    }

    router.refresh();
  };

  return (
    <div className="bg-foreground/5 flex items-center gap-4 rounded-lg p-2 pr-4">
      <div>
        <Image
          src={`https://cdn.discordapp.com/icons/${project.guildId}/${project.icon}.png?size=128`}
          alt={`${project.name} icon`}
          width={40}
          height={40}
          className="rounded-md"
        />
      </div>
      <div className="basis-1/6">{project.name}</div>
      <div className="basis-1/6">{project.position}</div>
      <div className="flex-1">{project.invite}</div>
      <div className="space-x-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <IconPencil />
            </Button>
          </DialogTrigger>
          <DialogContent className="gap-8">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>Edit your project.</DialogDescription>
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
                Edit Project
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

export default EditProject;
