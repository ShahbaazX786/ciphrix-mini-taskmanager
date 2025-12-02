// Hooks to use zustand mutations to execute api calls.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import { editTaskSchema, newTaskSchema } from "../schema/task.schema";
import { useTaskStore } from "../store/task.store";
import { mutationError, taskQueryResponse } from "../types";
import { createTask, deleteTask, fetchAllTasks, updateTask } from "./api.task";

const useTaskQuery = () => {
  const queryClient = useQueryClient();
  const { page, limit, setPage, setTotalPages, setTasks } = useTaskStore();

  const taskQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async (): Promise<taskQueryResponse> => {
      const data: taskQueryResponse = await fetchAllTasks(page, limit);
      if (data?.success) {
        setPage(data?.page);
        setTotalPages(data?.totalPages);
        setTasks(data?.taskList);
      }
      return data;
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: async (data: z.infer<typeof newTaskSchema>) => {
      const result = await createTask(data);
      return result;
    },
    onMutate: () => {
      toast.loading("Creating Task...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Task Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: mutationError) => {
      toast.dismiss();
      toast.error(err?.response?.data?.message || "Failed to create task");
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: z.infer<typeof editTaskSchema>;
    }) => {
      const result = await updateTask(id, payload);
      return result;
    },
    onMutate: () => {
      toast.loading("Updating task...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: mutationError) => {
      toast.dismiss();
      toast.error(err?.response?.data?.message || "Failed to update task");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteTask(id);
      return result;
    },
    onMutate: () => {
      toast.loading("Deleting task...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: mutationError) => {
      toast.error(err?.response?.data?.message || "Failed to delete task");
    },
  });

  return {
    taskQuery,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};

export default useTaskQuery;
