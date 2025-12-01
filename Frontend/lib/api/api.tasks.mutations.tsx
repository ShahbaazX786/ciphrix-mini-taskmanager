// Hooks to use zustand mutations to execute api calls.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import { editTaskSchema, newTaskSchema } from "../schema/task.schema";
import { useTaskStore } from "../store/task.store";
import { createTask, deleteTask, fetchAllTasks, updateTask } from "./api.task";

const useTasks = () => {
  const queryClient = useQueryClient();
  const { page, limit, setTotalPages } = useTaskStore();

  const tasksQuery = useQuery({
    queryKey: ["tasks", page, limit],
    queryFn: async () => {
      const res = await fetchAllTasks(page, limit);
      if (res.success) {
        setTotalPages(res.totalPages);
      }
      return res;
    },
    retry: 3,
    retryDelay: 3000,
  });

  const createTaskMutation = useMutation({
    mutationFn: async (data: z.infer<typeof newTaskSchema>) => {
      return toast.promise(createTask(data), {
        loading: "Creating Task...",
        success: "Task Created Sucessfully!",
        error: (err) => err?.response?.data?.message || "Failed to Create Task",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", page, limit] });
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
      return toast.promise(updateTask(id, payload), {
        loading: "Updating Task...",
        success: "Task Updated Sucessfully!",
        error: (err) => err?.response?.data?.message || "Failed to Update Task",
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false }),
  });

  return {
    tasksQuery,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};

export default useTasks;
