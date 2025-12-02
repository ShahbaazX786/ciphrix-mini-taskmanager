import express from "express";
import serverless from "serverless-http";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

import authRoutes from '../routes/auth.routes.js';
import taskRoutes from '../routes/task.routes.js';
import cookieParser from "cookie-parser";

dotenv.config();
await connectDB();

const app = express();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (_req, res) => {
    res.send("Backend is up and running");
});

export const handler = serverless(app);
export default handler;
