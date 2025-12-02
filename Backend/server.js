import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import { connectDB } from './utils/ConnectDB.js';
import './utils/dotenvConfig.js';

const app = express();

// middlewares
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/api/status', (_req, res) => res.send('Server is up and Running'));
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

// Lazy DB connect
let isConnected = false;

async function ensureDB() {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
}

app.use(async (_req, _res, next) => {
    await ensureDB();
    next();
});

export default app;
