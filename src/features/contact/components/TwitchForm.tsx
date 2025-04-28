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
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  twitchName: z.string().min(1, { message: 'Twitch name is required' }),
  appeal: z.string().min(1, { message: 'Appeal is required' }),
});

const TwitchForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      twitchName: '',
      appeal: '',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            name="email"
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
            name="appeal"
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

          <Button
            variant={'secondary'}
            className="w-full justify-start"
            size={'lg'}
          >
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TwitchForm;
