import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from '../routes/auth.routes.js';
import taskRoutes from '../routes/task.routes.js';
import mongoose from "mongoose";

dotenv.config();


const app = express();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
app.use(express.json());
app.use(cookieParser());
// await connectDB();

let isConnected = false;
async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = true;
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to DB', error);
    }

}

app.use((_req, _res, next) => {
    if (!isConnected) {
        connectToDB();
    }
    next();
})

app.get("/", (_req, res) => {
    res.send("Backend is up and running");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;