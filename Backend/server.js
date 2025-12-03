// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import express from 'express';
// import authRoutes from './routes/auth.routes.js';
// import taskRoutes from './routes/task.routes.js';
// import { connectDB } from './utils/ConnectDB.js';
// import './utils/dotenvConfig.js';

// const app = express();
// const PORT = process.env.PORT || 7200;

// // middlewares
// await connectDB();
// app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
// app.use(express.json());
// app.use(cookieParser())
// app.use('/api/auth', authRoutes);
// app.use('/api/task', taskRoutes);

// // Initial Route
// app.get('/', (_req, res) => {
//     res.send('Server is up and running');
// });


// app.listen(PORT, async () => {
//     console.log(`Server is running on port ${PORT}`);
// })