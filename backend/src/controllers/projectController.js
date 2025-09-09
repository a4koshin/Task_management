import mongoose from "mongoose";
import projectModel from "../model/projectModel.js";

export const createProject = async (req, res) => {
  const userId = req.userId;
  try {
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { name, description, deadline } = req.body;

    if (!name || !description || !deadline) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (name.trim().length < 3 || name.trim().length > 50) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project name" });
    }
    if (description.length > 300) {
      return res
        .status(400)
        .json({ success: false, message: "Description too long" });
    }
    if (isNaN(Date.parse(deadline))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid deadline" });
    }

    const newProject = new projectModel({
      user: userId,
      name: name.trim(),
      description: description.trim(),
      deadline: new Date(deadline),
    });

    await newProject.save();
    res.status(201).json({
      success: true,
      message: "New Project created succesfully",
      project: newProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProjects = async (req, res) => {
  const userId = req.userId;
  try {
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const projects = await projectModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    if (!projects.length) {
      return res.status(200).json({
        success: true,
        message: "No projects found",
        projects: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProject = async (req, res) => {
  const userId = req.userId;
  const projectId = req.params.id;

  try {
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Project ID" });
    }

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

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProject = async (req, res) => {
  const userId = req.userId;
  const projectId = req.params.id;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

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

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
