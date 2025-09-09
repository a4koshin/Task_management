import mongoose from "mongoose";
import projectModel from "../model/projectModel.js";

// Helper: validate project fields
const validateProject = ({ name, description, deadline }) => {
  if (!name || !description || !deadline) {
    return "All fields are required";
  }
  if (name.trim().length < 3 || name.trim().length > 50) {
    return "Invalid project name";
  }
  if (description.length > 300) {
    return "Description too long";
  }
  if (isNaN(Date.parse(deadline))) {
    return "Invalid deadline";
  }
  return null;
};

// Create Project
export const createProject = async (req, res) => {
  const userId = req.user.id;

  try {
    const error = validateProject(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    const { name, description, deadline } = req.body;
    const newProject = new projectModel({
      user: userId,
      name: name.trim(),
      description: description.trim(),
      deadline: new Date(deadline),
    });

    await newProject.save();
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  const userId = req.user.id;
  try {
    const projects = await projectModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      message: projects.length
        ? "Projects fetched successfully"
        : "No projects found",
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update project (partial allowed)
export const updateProject = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Project ID" });
  }

  try {
    const { name, description, deadline } = req.body;
    const updates = {};

    if (name) {
      if (name.trim().length < 3 || name.trim().length > 50) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid project name" });
      }
      updates.name = name.trim();
    }

    if (description) {
      if (description.length > 300) {
        return res
          .status(400)
          .json({ success: false, message: "Description too long" });
      }
      updates.description = description.trim();
    }

    if (deadline) {
      if (isNaN(Date.parse(deadline))) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid deadline" });
      }
      updates.deadline = new Date(deadline);
    }

    const project = await projectModel.findOneAndUpdate(
      { _id: projectId, user: userId },
      updates,
      { new: true }
    );

    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });

    res
      .status(200)
      .json({
        success: true,
        message: "Project updated successfully",
        project,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Project ID" });
  }

  try {
    const project = await projectModel.findOneAndDelete({
      _id: projectId,
      user: userId,
    });

    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });

    res
      .status(200)
      .json({
        success: true,
        message: "Project deleted successfully",
        project,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
