'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Contact } from '../../../../prisma/generated/client';

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'isReplied',
    header: 'Replied',
    cell: ({ row }) => {
      const isReplied = row.getValue('isReplied');
      return <span className={''}>{isReplied ? 'Yes' : 'No'}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const createdAt: string = row.getValue('createdAt');
      return (
        <span>
          {new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })}
        </span>
      );
    },
  },
];
