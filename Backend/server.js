import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './utils/ConnectDB.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7200;
app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
app.use(express.json());

// Initial Route
app.get('/', (_req, res) => {
    res.send('Server is up and running');
});

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
})
