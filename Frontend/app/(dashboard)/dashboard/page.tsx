"use client";

import DeleteAlert from "@/components/custom/delete-dialog";
import { Button } from "@/components/ui/button";
import useTasks from "@/lib/api/api.tasks.mutations";
import { Plus, Trash2 } from "lucide-react";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import TashSheet from "./components/taskSheet";

const DashboardPage = () => {
  const { tasksQuery } = useTasks();

  return (
    <section className="container mx-auto px-8 py-10 bg-gray-200 dark:bg-gray-800">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-2">
          Here is a overview of all the tasks
        </h1>

        <div className="flex justify-between items-center gap-2 my-2 mr-2">
          <TashSheet
            mode={"new"}
            trigger={
              <Button
                variant={"premium"}
                className="rounded-full cursor-pointer"
              >
                <Plus size={12} />
                New
              </Button>
            }
          />
          <DeleteAlert
            trigger={
              <Button
                variant={"destructive"}
                className="rounded-full cursor-pointer"
              >
                <Trash2 size={12} />
                Delete
              </Button>
            }
            id={"1"}
          />
        </div>
      </div>
      <DataTable columns={columns} data={tasksQuery.data?.taskList ?? []} />
    </section>
  );
};

export default DashboardPage;
