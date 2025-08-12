import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protectTask } from "../middleware/authMiddleware.js";

const taskRouter = express.Router();

taskRouter.get("/", protectTask, getTasks);

taskRouter.get("/:id", protectTask, getTaskById);

taskRouter.post("/", protectTask, createTask);

taskRouter.put("/:id", protectTask, updateTask);

taskRouter.delete("/:id", protectTask, deleteTask);

export default taskRouter;
