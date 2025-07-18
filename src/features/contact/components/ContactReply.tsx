'use client';

import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { markAsRead } from '../actions/markAsRead';
import { Contact } from '../../../../prisma/generated/client';
import { JsonObject } from '../../../../prisma/generated/client/runtime/library';
import { useRouter } from 'next/navigation';
import { replyToContact } from '../actions/reply';
import { toast } from 'sonner';

interface ContactReplyProps {
  contact: Contact;
}

const ContactReply = ({ contact }: ContactReplyProps) => {
  const router = useRouter();
  const { meta, message, createdBy } = contact;
  const [replyMessage, setReplyMessage] = useState(contact.reply ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = Object.entries({
    ...(meta as JsonObject),
    message,
    ['Discord ID']: createdBy,
  }).map(([key, value]) => {
    return {
      key,
      value,
    };
  });

  useEffect(() => {
    if (contact.isRead) return;

    markAsRead(contact.id);
    router.refresh();
  }, [contact.id, router, contact.isRead]);

  const handleSendReply = async () => {
    const message = replyMessage.trim();
    if (!message || contact.isReplied) {
      return;
    }

    setIsSubmitting(true);

    const reply = await replyToContact(contact.id, message);

    if (reply.error) {
      console.error(reply.error);
      toast.error(reply.error);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    toast.success('Reply sent successfully!');
    router.refresh();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Reply to Contact</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-4">
          {fields.map(({ key, value }) => {
            if (!value) return null; // Skip empty values
            return (
              <div key={key} className="flex flex-col gap-2">
                <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <p className="bg-foreground/10 rounded-lg px-3 py-2 text-sm">
                  {value}
                </p>
              </div>
            );
          })}
        </div>
        <div className="space-y-2">
          <Label>Reply Message</Label>
          <Textarea
            className="bg-foreground/10 h-32 resize-none"
            placeholder="Reply to contact message"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            readOnly={contact.isReplied}
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          className="w-full"
          variant={'secondary'}
          disabled={contact.isReplied || isSubmitting}
          onClick={handleSendReply}
        >
          Send Reply
        </Button>
      </DialogFooter>
    </>
  );
};

export default ContactReply;
