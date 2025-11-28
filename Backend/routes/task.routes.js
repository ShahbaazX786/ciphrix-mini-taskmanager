import express from "express";
import { createTask } from "../controllers/task.controller.js";

const Router = express.Router();

Router.post('/create', createTask);

export default Router;