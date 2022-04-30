import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require("dotenv").config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes import
import userRouter from "./routes/user.js";

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Database Connectivity
const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 4000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} Database Connection Failed`));


// API routes
app.use("/user", userRouter);