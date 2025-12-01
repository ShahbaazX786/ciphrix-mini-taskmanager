import z from "zod";
import { editTaskSchema, newTaskSchema } from "../schema/task.schema";
import API from "./api.config";

const fetchAllTasks = async (page: number, limit: number) => {
  const res = await API.get(`/task/all?page=${page}&limit=${limit}`);
  return res.data;
};

const createTask = async (data: z.infer<typeof newTaskSchema>) => {
  const res = await API.post("/task/create", data);
  return res.data;
};

const updateTask = async (id: string, data: z.infer<typeof editTaskSchema>) => {
  const res = await API.put(`/task/${id}`, data);
  return res.data;
};

const deleteTask = async (id: string) => {
  const res = await API.delete(`/task/${id}`);
  return res.data;
};

const deleteAllTasks = async () => {
  const res = await API.delete("/task/all");
  return res.data;
};

export { createTask, deleteAllTasks, deleteTask, fetchAllTasks, updateTask };
