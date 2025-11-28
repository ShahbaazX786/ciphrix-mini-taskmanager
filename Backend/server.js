import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './utils/ConnectDB.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7200;
app.use(cors({ origin: process.env.ORIGIN, credentials: true }))

// Initial Route
app.get('/', (_req, res) => {
    res.send('Server is up and running');
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
})