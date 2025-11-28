import express from "express";
import { createTask, deleteTask, fetchAllTasks, getTask, updateTask } from "../controllers/task.controller.js";

const Router = express.Router();

Router.get('/all', fetchAllTasks)
Router.post('/create', createTask)
Router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

export default Router;