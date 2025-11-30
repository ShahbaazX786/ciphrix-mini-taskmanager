import { Button } from "@/components/ui/button";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { Plus, Trash2 } from "lucide-react";
import TashSheet from "./components/taskSheet";

const dummyTasks = [
  {
    _id: "69298be0b54d4d4fd3be3b91",
    title: "Do a Prank",
    description: "Run!......",
    status: "Completed",
    createdAt: "2025-11-28T11:47:44.886Z",
    updatedAt: "2025-11-28T12:08:11.644Z",
    __v: 0,
  },
  {
    _id: "69298be0b54d4d4fd3be3b92",
    title: "Unsubscribe All stupid channels",
    description: "yoi yoii yoiii",
    status: "Pending",
    createdAt: "2025-11-28T11:47:44.886Z",
    updatedAt: "2025-11-28T12:08:11.644Z",
    __v: 0,
  },
];

const DashboardPage = () => {
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
          <TashSheet
            mode={"edit"}
            trigger={
              <Button
                variant={"destructive"}
                className="rounded-full cursor-pointer"
              >
                <Trash2 size={12} />
                Delete
              </Button>
            }
          />
        </div>
      </div>
      <DataTable columns={columns} data={dummyTasks} />
    </section>
  );
};

export default DashboardPage;
