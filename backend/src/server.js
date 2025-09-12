import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import taskRouter from "./routes/taskRouter.js";
import projectRouter from "./routes/projectRouter.js";
import "./config/mailer.js";
import "./jobs/reminderJob.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/projects", projectRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`App Runs on Port number ${port}`);
  });
});
