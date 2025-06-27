'use server';

import { prisma } from '@/lib/prisma';

export async function getContacts() {
  try {
    // Fetch contacts from the database
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: contacts,
    };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return {
      error: (error as Error).message,
    };
  }
}
