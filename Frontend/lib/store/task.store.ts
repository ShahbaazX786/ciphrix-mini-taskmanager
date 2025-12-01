import { create } from "zustand";
import { TaskState } from "../types";

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),

  page: Number(process.env.NEXT_PUBLIC_API_PAGE),
  totalPages: Number(process.env.NEXT_PUBLIC_API_PAGE),
  limit: Number(process.env.NEXT_PUBLIC_API_LIMIT),
  setPage: (page) => set({ page }),
  setTotalPages: (total) => set({ totalPages: total }),
  setLimit: (limit) => set({ limit }),
}));
