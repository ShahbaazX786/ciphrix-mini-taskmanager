"use client";

import DeleteAlert from "@/components/custom/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth.store";
import { useTaskStore } from "@/lib/store/task.store";
import { Task } from "@/lib/types";
import { cn, getFormattedDate, TableSortingFunction } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import TaskSheet from "../dashboard/components/taskSheet";

export const columns: ColumnDef<Task>[] = [
  // Disabling multi - select for now.
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  // },
  {
    accessorKey: "title",
    header: ({ column }) => <SortingHeader column={column} header={"Title"} />,
    sortingFn: (rowA, rowB, columnId) =>
      TableSortingFunction(rowA, rowB, columnId),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <SortingHeader column={column} header={"Description"} />
    ),
    sortingFn: (rowA, rowB, columnId) =>
      TableSortingFunction(rowA, rowB, columnId),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortingHeader column={column} header={"Status"} />,
    sortingFn: (rowA, rowB, columnId) =>
      TableSortingFunction(rowA, rowB, columnId),
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
    header: ({ column }) => (
      <SortingHeader column={column} header={"Created Date"} />
    ),
    sortingFn: (rowA, rowB, columnId) =>
      TableSortingFunction(rowA, rowB, columnId),
    cell: ({ row }) => getFormattedDate(row.original.createdAt),
  },
  {
    id: "actions",
    header: "Task Action",
    cell: ({ row }) => <ActionButtons row={row} />,
  },
];

// Table Helper methods.
export const ActionButtons = ({ row }: { row: any }) => {
  const id = row?.original?._id;
  const { setSelectedTask } = useTaskStore();
  const { user } = useAuthStore();
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

      {user?.role === "admin" && (
        <DeleteAlert
          id={id}
          trigger={
            <Button variant={"destructive"} className="cursor-pointer">
              <Trash />
            </Button>
          }
        />
      )}
    </section>
  );
};

export const SortingHeader = ({
  column,
  header,
}: {
  column: any;
  header: string;
}) => {
  return (
    <Button
      className="group"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {header}
      <ArrowUpDown className="ml-2 h-4 w-4 invisible group-hover:visible" />
    </Button>
  );
};
