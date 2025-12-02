import z from "zod";
import { signupFormSchema } from "./schema/user.schema";

// Generic React Types
type ReactChildren = {
  children: React.ReactNode;
};

// Component Specific Types
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
  user: UserState;
  session: SessionState;

  setUserState: (e: string | null, r: "user" | "admin") => void;
  setSessionState: (te: number, tw: number) => void;
  logout: () => void;
}

type taskQueryResponse = {
  hasNext: boolean;
  limit: number;
  page: number;
  success: boolean;
  taskList: Task[];
  total: number;
  totalPages: number;
};

type userResponseState = {
  fullName: string;
  email: string | null;
  role: "user" | "admin";
};

type UserState = {
  email: string | null;
  role: "user" | "admin";
};

type SessionState = {
  tokenExpiry: number;
  tokenWarning: number;
};

// Auth Types (Login, Signup, Logout, RefreshToken)
type signupPayload = z.infer<typeof signupFormSchema>;
type loginPayload = Pick<signupPayload, "email" | "password">;

type authResponse = {
  success: boolean;
  message: string;
  token: string;
  tokenExpiry: number;
  user: userResponseState;
};

type loginResponse = authResponse;

export type {
  SessionState,
  UserState,
  loginPayload,
  mutationError,
  ReactChildren,
  signupPayload,
  Task,
  taskQueryResponse,
  testimonial,
  loginResponse,
};
