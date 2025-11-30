import { create } from "zustand";

interface TaskState {
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;

  selectedTask: any | null;
  setSelectedTask: (task: any | null) => void;

  page: number;
  totalPages: number;
  limit: number;
  setPage: (p: number) => void;
  setTotalPages: (t: number) => void;
  setLimit: (l: number) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  isSheetOpen: false,
  openSheet: () => set({ isSheetOpen: true }),
  closeSheet: () => set({ isSheetOpen: false }),

  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),

  page: Number(process.env.NEXT_PUBLIC_API_PAGE),
  totalPages: Number(process.env.NEXT_PUBLIC_API_PAGE),
  limit: Number(process.env.NEXT_PUBLIC_API_LIMIT),
  setPage: (page) => set({ page }),
  setTotalPages: (total) => set({ totalPages: total }),
  setLimit: (limit) => set({ limit }),
}));
