import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";

export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post("/tasks", taskData);
    toast.success("Task created successfully!");
    return response.data;
  } catch (error) {
    console.error("Failed to create task:", error);
    toast.error("Failed to create task.");
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    toast.error("Failed to fetch tasks.");
  }
};

export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/tasks/${taskId}`, updatedData);
    toast.success("Task updated successfully!");
    return response.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    toast.error("Failed to update task.");
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}`);
    toast.success("Task deleted successfully!");
  } catch (error) {
    console.error("Failed to delete task:", error);
    toast.error("Failed to delete task.");
  }
};
