import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { NotebookPen } from "lucide-react";
import TaskSheet from "./taskSheet";

const EmptyDashboard = () => {
  return (
    <Empty className="border border-dashed w-full h-full py-10">
      <EmptyHeader className="max-w-lg">
        <EmptyMedia variant="icon">
          <NotebookPen className="w-20 h-20" size={48} />
        </EmptyMedia>

        <EmptyTitle className="text-xl lg:text-2xl font-semibold">
          No Tasks Found
        </EmptyTitle>

        <EmptyDescription className="text-sm lg:text-lg w-full text-muted-foreground">
          <span className="bg-clip-text bg-linear-to-b from-purple-400 to-pink-400 text-transparent">
            You haven&apos;t created any tasks yet.
          </span>
          <br></br>Start by adding your first task to organize and track your
          work more efficiently.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="mt-2">
        <TaskSheet
          mode={"new"}
          trigger={
            <Button
              variant={"premium"}
              className="rounded-full cursor-pointer w-36 h-10 hover:scale-110 transition-all ease-linear select-none"
            >
              Create a Task
            </Button>
          }
        />
      </EmptyContent>
    </Empty>
  );
};

export default EmptyDashboard;
