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
import { otherSchema } from '../schemas/other';
import { toast } from 'sonner';
import { createOtherContact } from '../actions/createOtherContact';

const OtherForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof otherSchema>>({
    resolver: zodResolver(otherSchema),
    defaultValues: {
      email: '',
      twitchName: '',
      subject: '',
      description: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    const contact = await createOtherContact(data);

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
            name="twitchName"
            disabled={!session}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Twitch Name</FormLabel>
                  <FormControl>
                    <Input placeholder="xZyyrixx" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            name="subject"
            disabled={!session}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            name="description"
            disabled={!session}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your issue in detail."
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

export default OtherForm;
