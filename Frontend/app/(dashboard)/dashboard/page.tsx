"use client";

import DeleteAlert from "@/components/custom/delete-dialog";
import { Button } from "@/components/ui/button";
import useTasks from "@/lib/api/api.tasks.mutations";
import { useTaskStore } from "@/lib/store/task.store";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import TaskSheet from "./components/taskSheet";

const DashboardPage = () => {
  const { tasksQuery } = useTasks();
  const { tasks, setTasks } = useTaskStore();

  useEffect(() => {
    if (tasksQuery.isSuccess && tasksQuery?.data?.taskList) {
      setTasks(tasksQuery?.data?.taskList);
    }
  }, [tasksQuery.isSuccess, tasksQuery?.data, setTasks, tasks]);

  if (tasksQuery.isLoading) return <p> Loading, Please Wait...</p>;
  if (tasksQuery.isError) return <p>Error, Please try again.</p>;

  return (
    <section className="container mx-auto px-8 py-10 bg-gray-200 dark:bg-gray-800">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-2">
          Here is a overview of all the tasks
        </h1>

        <div className="flex justify-between items-center gap-2 my-2 mr-2">
          <TaskSheet
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
      <DataTable columns={columns} data={tasks ?? []} />
    </section>
  );
};

export default DashboardPage;
