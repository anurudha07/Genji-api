import express, { Application } from 'express';
import dotenv from 'dotenv';
// import connectDB from './config/db';
import cors from "cors";

dotenv.config();

// Connect to MongoDB
// connectDB();

const app: Application = express();

app.use(
  cors({
    origin: ["https://admin.nuhvibe.com", "http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
// app.use('/public', express.static('public'));

// // Routes
// app.use('/api/v1', routes);

// // admin
// app.use("/admin/v1", adminRouter);

// // Health Check Endpoint
// app.get('/health', healthCheck);

export default app;