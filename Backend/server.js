import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import { connectDB } from './utils/ConnectDB.js';
import './utils/dotenvConfig.js';

const app = express();
const server = http.createServer(app);

// middlewares
app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
app.use(express.json());
app.use(cookieParser())

// Routes
app.use('/api/status', (_req, res) => res.send('Server is up and Running'));
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

// DB Connection
await connectDB();

// Env Checking and local app Startup.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); })
}

// Otherwise vercel will reuse the server and listen to it itself.
export default server;