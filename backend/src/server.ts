import "../configuration/env.js";

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from '../routes/chat';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app =express();

app.use(cors());
app.use(express.json());

// app.use('/api/chat', require(chatRoutes));
app.use('/api/chat', chatRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});