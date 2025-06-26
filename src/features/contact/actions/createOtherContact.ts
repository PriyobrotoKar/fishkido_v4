'use server';

import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { otherSchema } from '../schemas/other';

export async function createOtherContact(data: z.infer<typeof otherSchema>) {
  try {
    // check if the user is logged in
    const session = await auth();
    if (!session || !session.user?.id) {
      throw new Error('You must be logged in to submit a message.');
    }

    const parsedData = otherSchema.parse(data);

    // check if the user has already submitted a contact form within the last 1 hour
    const existingContact = await prisma.contact.findFirst({
      where: {
        createdBy: session.user.id,
        createdAt: {
          gte: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        },
      },
    });

    if (existingContact) {
      throw new Error('You have already submitted your message.');
    }

    // create the Discord contact
    const contact = await prisma.contact.create({
      data: {
        email: parsedData.email,
        name: parsedData.twitchName || session.user.name || 'Anonymous',
        message: parsedData.description,
        meta: {
          subject: parsedData.subject,
        },
        createdBy: session.user.id,
      },
    });

    return {
      data: contact,
    };
  } catch (error) {
    console.error('Error creating Twitch contact:', error);
    return {
      error: (error as Error).message,
    };
  }
}
