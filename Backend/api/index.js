import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.routes.js";
import taskRoutes from "../routes/task.routes.js";
import mongoose from "mongoose";

dotenv.config();

let isConnected = false;

async function connectToDB() {
    if (isConnected) return;

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = conn.connections[0].readyState === 1;

        console.log("MongoDB Connected:", isConnected);
    } catch (error) {
        console.error("Mongo DB connection error:", error);
    }
}

await connectToDB();

const app = express();

app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
    res.send("Backend is up and running");
});

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

export default app;