import express from "express";
import { protectTask } from "../middleware/authMiddleware.js";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const projectRouter = express.Router();

// All routes are protected
projectRouter.use(protectTask);

projectRouter.post("/", createProject);
projectRouter.get("/", getProjects);
projectRouter.put("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;
