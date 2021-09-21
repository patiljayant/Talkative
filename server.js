import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { connectdb } from './config/connectdb.js';

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
connectdb();

app.use(cors());
app.use(express.json());

app.use('/api/user/auth-routes', authRoutes);
app.use('/api/user/chat-routes', chatRoutes);
app.use('/api/user/user-routes', userRoutes);

app.listen(port, ()=>{
    console.log("Server running on port " + port);
})