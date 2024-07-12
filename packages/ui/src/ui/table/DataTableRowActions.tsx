'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontalIcon, Pen, Trash2, TrashIcon, ViewIcon } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from '../dropdown-menu';

export interface DataTableRowActionsProps<T extends z.ZodObject<any, any>> {
  row: Row<T>;
  Edit?: ({ defaults }: any) => JSX.Element;
  View?: ({ defaults }: any) => JSX.Element;
  Delete?: ({ defaults }: any) => JSX.Element;
  custom?: {
    onClick: (row: z.infer<T>) => void;
    title: string;
    icon?: JSX.Element;
    condition: (row: z.infer<T>) => boolean;
  }[];
}

export function DataTableRowActions<T extends z.ZodObject<any, any>>({
  row,
  Edit,
  View,
  Delete,
  custom,
}: DataTableRowActionsProps<T>) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const values = row
    .getVisibleCells()
    .reduce((acc, cell) => ({ ...acc, [cell.column.id]: cell.getValue() }), {}) as z.infer<T>;

  return (
    <DropdownMenu>
      {showEditDialog && Edit && <Edit defaults={values} />}
      {showViewDialog && View && <View defaults={values} />}
      {showDeleteDialog && Delete && <Delete defaults={values} />}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {Boolean(View) && (
          <Button
          className="flex my-auto hover:bg-green-600 hover:text-white w-full "
          variant={'ghost'}
          onClick={() => setShowViewDialog((prev) => !prev)}
        >
          <ViewIcon className="w-4 h-4" />
          <span className="ml-2">View</span>
        </Button>
        )}

        {Boolean(Edit) && (
          <Button
          className="flex my-auto hover:bg-secondary hover:text-white w-full "
          variant={'ghost'}
          onClick={() => setShowEditDialog((prev) => !prev)}
        >
          <Pen className="w-4 h-4" />
          <span className="ml-2">Edit</span>
        </Button>
        )}

        {Boolean(Delete) && (
          <Button
            className="flex my-auto hover:bg-primary hover:text-white w-full "
            variant={'ghost'}
            onClick={() => setShowDeleteDialog((prev) => !prev)}
          >
            <Trash2 className="w-4 h-4" />
            <span className="ml-2">Delete</span>
          </Button>
        )}
        {custom
          ?.filter((item) => item.condition(values))
          .map((item) => (
            <DropdownMenuItem onClick={() => item.onClick(values)}>
              {item.title}
              <DropdownMenuShortcut>{item.icon && item.icon}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        {/* <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>
            <TrashIcon size={12} />
          </DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
