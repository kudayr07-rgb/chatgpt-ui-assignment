import "../configuration/env.js";

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from '../routes/chat';

dotenv.config();
const PORT = process.env.PORT || 3001;

const app =express();

app.use(cors());
app.use(express.json());

// app.use('/api/chat', require(chatRoutes));
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})