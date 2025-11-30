import API from "./api.config";

const fetchAllTasks = async (page: number, limit: number) => {
  const res = await API.get(`/task/all?page=${page}&limit=${limit}`);
  return res.data;
};

const createTask = async (data: any) => {
  const res = await API.post("/task/create", data);
  return res.data;
};

const updateTask = async (data: any) => {
  const res = await API.put("/task/create", data);
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

export { fetchAllTasks, createTask, updateTask, deleteTask, deleteAllTasks };
