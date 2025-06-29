'use client';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { columns } from './Columns';
import { Contact } from '../../../../prisma/generated/client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactReply from './ContactReply';
import { useState } from 'react';

interface DataTableProps {
  data: Contact[];
}

export function ContactTable({ data }: DataTableProps) {
  const [open, setOpen] = useState(false);
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Dialog open={open} onOpenChange={setOpen} key={row.id}>
                <DialogTrigger asChild>
                  <TableRow
                    data-state={row.getIsSelected() && 'selected'}
                    className={!row.original.isRead ? 'bg-foreground/20' : ''}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </DialogTrigger>

                <DialogContent className="gap-8">
                  <ContactReply contact={row.original} setOpen={setOpen} />
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No messages yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
