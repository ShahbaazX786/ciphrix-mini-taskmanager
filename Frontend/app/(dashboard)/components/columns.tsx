"use client";

import DeleteAlert from "@/components/custom/delete-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTaskStore } from "@/lib/store/task.store";
import { Task } from "@/lib/types";
import { cn, getFormattedDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import TaskSheet from "../dashboard/components/taskSheet";
import { Badge } from "@/components/ui/badge";

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
    cell: ({ row }) => {
      const status = row?.original?.status;
      return (
        <Badge
          className={cn(
            status === "Completed" ? "bg-green-500" : "bg-yellow-500",
            "text-white"
          )}
        >
          {status}
        </Badge>
      );
    },
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
  const { setSelectedTask } = useTaskStore();

  return (
    <section id={id} className="flex flex-row justify-start items-start gap-2">
      <TaskSheet
        mode={"edit"}
        trigger={
          <Button
            onClick={() => setSelectedTask(row?.original)}
            variant={"default"}
            className="cursor-pointer"
          >
            <Edit />
          </Button>
        }
      />

      <DeleteAlert
        id={id}
        trigger={
          <Button variant={"destructive"} className="cursor-pointer">
            <Trash />
          </Button>
        }
      />
    </section>
  );
};
