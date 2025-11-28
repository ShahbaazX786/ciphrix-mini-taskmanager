import express from "express";
import { createTask, fetchAllTasks } from "../controllers/task.controller.js";

const Router = express.Router();

Router.get('/all', fetchAllTasks).post('/create', createTask);

export default Router;