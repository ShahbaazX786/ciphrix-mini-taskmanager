import { create } from "zustand";
import { Task } from "../types";

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;

  page: number;
  totalPages: number;
  limit: number;
  setPage: (p: number) => void;
  setTotalPages: (t: number) => void;
  setLimit: (l: number) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks: Task[]) => set({ tasks }),
  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),

  page: Number(process.env.NEXT_PUBLIC_API_PAGE),
  totalPages: Number(process.env.NEXT_PUBLIC_API_PAGE),
  limit: Number(process.env.NEXT_PUBLIC_API_LIMIT),
  setPage: (page) => set({ page }),
  setTotalPages: (total) => set({ totalPages: total }),
  setLimit: (limit) => set({ limit }),
}));
