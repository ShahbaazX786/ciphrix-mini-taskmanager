import './utils/dotenvConfig.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();
const server = http.createServer(app);

// middlewares
app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

// Initial Route
app.get('/', (_req, res) => {
    res.send('Server is up and running');
});

// DB Connection
await connectDB();

// Env Checking and local app Startup.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 7200;
    server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); })
}

// Otherwise vercel will reuse the server and listen to it itself.
export default server;