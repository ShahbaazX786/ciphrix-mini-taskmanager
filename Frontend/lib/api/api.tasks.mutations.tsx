// Hooks to use zustand mutations to execute api calls.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTaskStore } from "../store/task.store";
import { createTask, deleteTask, fetchAllTasks, updateTask } from "./api.task";

const useTasks = () => {
  const queryClient = useQueryClient();
  const { page, limit, setTotalPages } = useTaskStore();

  const tasksQuery = useQuery({
    queryKey: ["tasks", page, limit],
    queryFn: async () => {
      const res = await fetchAllTasks(page, limit);
      console.warn(res);
      if (res.success) {
        setTotalPages(res.totalPages);
      }
      return res;
    },
    retry: 3,
    retryDelay: 3000,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload?: any }) =>
      updateTask(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return {
    tasksQuery,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};

export default useTasks;
