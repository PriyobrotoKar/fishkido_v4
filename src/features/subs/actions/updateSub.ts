'use server';

import { prisma } from '@/lib/prisma';
import { UpdateSubDto, UpdateSubSchema } from '../schemas/sub';
import { revalidatePath } from 'next/cache';

export const updateSub = async (id: string, data: UpdateSubDto) => {
  try {
    const parsedData = UpdateSubSchema.parse(data);

    const sub = await prisma.subs.update({
      where: { id },
      data: parsedData,
    });

    revalidatePath('/stats');
    revalidatePath('/admin/stats');

    return {
      data: sub,
    };
  } catch (error) {
    console.error('Error updating sub:', error);
    return {
      error: (error as Error).message,
    };
  }
};
