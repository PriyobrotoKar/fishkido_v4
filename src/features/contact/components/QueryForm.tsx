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
import { querySchema } from '../schemas/query';
import { createQueryContact } from '../actions/createQueryForm';
import { toast } from 'sonner';

const QueryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof querySchema>>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      email: '',
      question: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    const contact = await createQueryContact(data);

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
            disabled={!session}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="fishkido@gmail.com" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            name="question"
            disabled={!session}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Why .... ?" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            name="additionalComments"
            disabled={!session}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Additional comments"
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

export default QueryForm;
