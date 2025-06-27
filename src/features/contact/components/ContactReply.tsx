'use client';

import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { markAsRead } from '../actions/markAsRead';
import { Contact } from '../../../../prisma/generated/client';
import { JsonObject } from '../../../../prisma/generated/client/runtime/library';
import { useRouter } from 'next/navigation';

interface ContactReplyProps {
  contact: Contact;
}

const ContactReply = ({ contact }: ContactReplyProps) => {
  const router = useRouter();
  const { meta, message } = contact;

  const fields = Object.entries({
    ...(meta as JsonObject),
    message,
  }).map(([key, value]) => ({
    key,
    value,
  }));

  useEffect(() => {
    if (contact.isRead) return;

    markAsRead(contact.id);
    router.refresh();
  }, [contact.id, router, contact.isRead]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Reply to Contact</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-4">
          {fields.map(({ key, value }) => (
            <div key={key} className="flex flex-col gap-2">
              <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <p className="bg-foreground/10 rounded-lg px-3 py-2">{value}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label>Reply Message</Label>
          <Textarea
            className="bg-foreground/10 h-32 resize-none"
            placeholder="Reply to contact message"
          />
        </div>
      </div>
      <DialogFooter>
        <Button className="w-full" variant={'secondary'}>
          Send Reply
        </Button>
      </DialogFooter>
    </>
  );
};

export default ContactReply;
