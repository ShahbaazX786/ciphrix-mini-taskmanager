import z from "zod";
import { signupFormSchema } from "./schema/user.schema";

type ReactChildren = {
  children: React.ReactNode;
};

type signupPayload = z.infer<typeof signupFormSchema>;
type loginPayload = Pick<signupPayload, "email" | "password">;

type testimonial = {
  userName: string;
  role: string;
  company: string;
  imageUrl: string;
  quote: string;
  rating: number;
};

type Task = {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "Completed";
  createdAt: string;
  updatedAt: string;
  __V: number;
};

type mutationError = any;

export interface TaskState {
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

export interface AuthState {
  isAuthenticated: boolean;
  isAdminUser: boolean;
  tokenExpiry: number;

  setIsAuthenticated: (flag: boolean) => void;
  setIsAdminUser: (flag: boolean) => void;
  setTokenExpiry: (t: number) => void;
  logout: () => void;
}

export type {
  loginPayload,
  mutationError,
  ReactChildren,
  signupPayload,
  Task,
  testimonial,
};
