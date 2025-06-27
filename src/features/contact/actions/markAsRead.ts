'use server';

import { prisma } from '@/lib/prisma';

export async function markAsRead(contactId: string) {
  try {
    // Check if the contact exists
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    });
    if (!contact) {
      throw new Error('Contact not found');
    }

    // Update the contact to mark it as read
    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: { isRead: true },
    });

    return {
      data: updatedContact,
    };
  } catch (error) {
    console.error('Error marking contact as read:', error);
    return {
      error: (error as Error).message,
    };
  }
}
