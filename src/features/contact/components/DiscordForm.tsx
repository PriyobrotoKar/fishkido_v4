import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { discordSchema } from '../schemas/discord';
import { createDiscordContact } from '../actions/createDiscordContact';
import { toast } from 'sonner';

const DiscordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof discordSchema>>({
    resolver: zodResolver(discordSchema),
    defaultValues: {
      email: '',
      punishmentId: '',
      appeal: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    const contact = await createDiscordContact(data);

    if (contact.error) {
      console.log(contact.error);
      toast.error(contact.error);
      setIsSubmitting(false);
      return;
    }

    form.reset();
    setIsSubmitting(false);
    toast.success('Message sent successfully!');
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            name="email"
            disabled={!session}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ezblivingstone@gmail.com" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            name="punishmentId"
            disabled={!session}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Punishment Id</FormLabel>
                  <FormControl>
                    <Input placeholder="1262309623067578370" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            name="appeal"
            disabled={!session}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Appeal"
                      className="min-h-40 resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          {session ? (
            <Button
              variant={'secondary'}
              className="w-full justify-start"
              size={'lg'}
            >
              Send Message
            </Button>
          ) : (
            <Button
              type="button"
              variant={'secondary'}
              className="w-full justify-start"
              size={'lg'}
              onClick={() => signIn('discord')}
              disabled={isSubmitting}
            >
              Log in to send message
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default DiscordForm;
