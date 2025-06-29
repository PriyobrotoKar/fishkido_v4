'use server';
import { prisma } from '@/lib/prisma';
import sendEmail from '@/lib/resend';

export async function replyToContact(contactId: string, replyMessage: string) {
  try {
    // check if the contact exists
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    });

    if (!contact) {
      throw new Error('Contact not found');
    }

    // check if it is already replied
    // if yes, return an error
    if (contact.isReplied) {
      throw new Error('Contact has already been replied to');
    }
    // send the reply message as an email to the contact email address
    await sendEmail({
      email: contact.email,
      message: replyMessage,
    });

    // update the contact to mark it as replied
    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: { isReplied: true, reply: replyMessage },
    });

    return {
      data: updatedContact,
    };
  } catch (error) {
    console.error('Error replying to contact:', error);
    return {
      error: (error as Error).message,
    };
  }
}
