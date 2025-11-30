"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getFormattedDate } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "Completed";
  createdAt: string;
  updatedAt: string;
  __V: number;
};

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => getFormattedDate(row.original.createdAt),
  },
  {
    id: "actions",
    header: "Task Actions",
    cell: ({ row }) => <ActionButtons row={row} />,
  },
];

export const ActionButtons = ({ row }: { row: any }) => {
  const id = row?.original?._id;
  return (
    <section id={id} className="flex flex-row justify-start items-start gap-2">
      <Button variant={"default"} className="cursor-pointer">
        <Edit />
      </Button>
      <Button variant={"destructive"} className="cursor-pointer">
        <Trash />
      </Button>
    </section>
  );
};
