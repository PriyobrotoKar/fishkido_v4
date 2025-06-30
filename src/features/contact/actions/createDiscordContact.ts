'use server';

import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { discordSchema } from '../schemas/discord';
import { revalidatePath } from 'next/cache';

export async function createDiscordContact(
  data: z.infer<typeof discordSchema>
) {
  try {
    // check if the user is logged in
    const session = await auth();

    if (!session || !session.user?.id) {
      throw new Error('You must be logged in to submit a message.');
    }

    const parsedData = discordSchema.parse(data);

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
        name: session.user.name || 'Anonymous',
        message: parsedData.appeal,
        meta: {
          punishmentId: parsedData.punishmentId,
        },
        createdBy: session.user.id,
      },
    });

    revalidatePath('/admin/tickets');

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
