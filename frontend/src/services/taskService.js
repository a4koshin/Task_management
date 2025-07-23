import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";

export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post("/tasks", taskData);
    if (response.status === 201) {
      toast.success("Task created successfully!");
      return response.data;
    } else {
      toast.error("Unexpected response while creating task.");
    }
  } catch (error) {
    console.error("Failed to create task:", error);
    toast.error(
      error.response?.data?.message ||
        "Failed to create task. Please try again."
    );
  }
};

export const getTasks = async () => {
  try {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    toast.error(
      error.response?.data?.message ||
        "Failed to fetch tasks. Please try again."
    );
  }
};

export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/tasks/${taskId}`, updatedData);
    toast.success("Task updated successfully!");
    return response.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    toast.error(
      error.response?.data?.message ||
        "Failed to update task. Please try again."
    );
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}`);
    toast.success("Task deleted successfully!");
  } catch (error) {
    console.error("Failed to delete task:", error);
    toast.error(
      error.response?.data?.message ||
        "Failed to delete task. Please try again."
    );
  }
};
