import taskModal from "../model/taskModal.js";
import ProjectModel from "../model/projectModel.js";
export const createTask = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const { title, description, status, priority, project } = req.body;
    const validStatus = ["todo", "pending", "completed"];
    const validPriority = ["low", "medium", "high"];

    const isExistingProject = await ProjectModel.findOne({
      _id: project,
      user: userId,
    });

    if (!isExistingProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    if (!title || !description || !status || !priority || !project)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    if (!validStatus.includes(status) || !validPriority.includes(priority)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status or priority value" });
    }

    const newTask = new taskModal({
      user: userId,
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      project,
    });

    await newTask.save();
    res.status(201).json({
      success: true,
      message: "New Task created succesfully",
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    res.status(401).json({ succes: true, message: "unathorized" });
  }
  try {
    const tasks = await taskModal
      .find({ user: userId })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  const userId = req.user.id;
  try {
    const task = await taskModal.findOne({ _id: req.params.id, user: userId });
    if (!task)
      return res
        .status(404)
        .json({ message: "task not found! or Not authorized" });
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  const userId = req.user.id;
  try {
    const { title, description, status, priority, project } = req.body;
    const validStatus = ["todo", "pending", "completed"];
    const validPriority = ["low", "medium", "high"];
    const isExistingProject = await ProjectModel.findOne({
      _id: project,
      user: userId,
    });

    if (!isExistingProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    if (!title || !description || !status || !priority || !project) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (!validStatus.includes(status) || !validPriority.includes(priority)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status or priority value" });
    }
    const updatedTask = await taskModal.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { title, description, status, priority, project },
      { new: true }
    );
    if (!updatedTask)
      return res
        .status(404)
        .json({ success: false, message: "NO Task founded!!" });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  const userId = req.user.id;
  try {
    const deletedTask = await taskModal.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or nor authorized" });
    }

    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
