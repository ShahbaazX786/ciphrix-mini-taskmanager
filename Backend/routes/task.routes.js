import express from "express";
import { createTask, fetchAllTasks, updateTask } from "../controllers/task.controller.js";

const Router = express.Router();

Router.get('/all', fetchAllTasks).post('/create', createTask).put('/:id', updateTask);

export default Router;