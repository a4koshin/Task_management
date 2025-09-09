import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import {
  getTasks,
  updateTask,
  deleteTask,
  createTask,
} from "../services/taskService";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // For creating new task
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const fetchTaskFromDB = async () => {
    try {
      const response = await getTasks();
      setTasks(response);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const handleAddTask = async () => {
    if (!taskTitle || !status) {
      alert("Please provide both title and status for the task.");
      return;
    }
    try {
      const taskData = {
        title: taskTitle,
        description: taskDescription,
        status,
        priority,
      };
      const response = await createTask(taskData);
      if (response.ok || response.status === 201) {
        toast.success("Task added successfully!");
        setTaskTitle("");
        setTaskDescription("");
        setStatus("");
        setPriority("");
        setShowTaskModal(false);
        fetchTaskFromDB();
      } else {
        toast.error("Failed to add task.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("An error occurred while adding the task.");
    }
  };

  const updateTaskFromDB = async () => {
    try {
      const updatedData = {
        ...selectedTask,
        dueDate: selectedTask.dueDate
          ? new Date(selectedTask.dueDate).toISOString()
          : null,
      };
      await updateTask(selectedTask._id, updatedData);
      await fetchTaskFromDB();
      setIsOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTaskFromDB = async () => {
    try {
      await deleteTask(selectedTask._id);
      await fetchTaskFromDB();
      setIsOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  useEffect(() => {
    fetchTaskFromDB();
  }, []);

  const groupedTasks = {
    "To do": tasks.filter((task) => task.status.toLowerCase() === "todo"),
    "In Progress": tasks.filter(
      (task) => task.status.toLowerCase() === "pending"
    ),
    Complete: tasks.filter((task) => task.status.toLowerCase() === "completed"),
  };

  return (
    <>
      {/* New Task Button */}
      <div className="flex justify-end p-6">
        <button
          onClick={() => setShowTaskModal(true)}
          className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
        >
          +<span>New Task</span>
        </button>
      </div>

      {/* Modal for Adding Task */}
      <Modal
        isVisible={showTaskModal}
        title="Add New Task"
        onClose={() => setShowTaskModal(false)}
        footer={
          <>
            <button
              onClick={() => setShowTaskModal(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
            >
              Add Task
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
          />
          <textarea
            placeholder="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
          >
            <option value="">Choose Status</option>
            <option value="todo">Todo</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
          >
            <option value="">Choose priority</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>
      </Modal>

      {/* Existing Task Boards */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* To Do */}
        <div>
          <h1 className="font-semibold text-2xl mb-4">To do</h1>
          <div className="space-y-4">
            {groupedTasks["To do"].map((task) => (
              <TaskCard key={task._id} task={task} onCardOpen={setIsOpen} />
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <h1 className="font-semibold text-2xl mb-4">Pending</h1>
          <div className="space-y-4">
            {groupedTasks["In Progress"].map((task) => (
              <TaskCard key={task._id} task={task} onCardOpen={setIsOpen} />
            ))}
          </div>
        </div>

        {/* Completed */}
        <div>
          <h1 className="font-semibold text-2xl mb-4">Completed</h1>
          <div className="space-y-4">
            {groupedTasks["Complete"].map((task) => (
              <TaskCard key={task._id} task={task} onCardOpen={setIsOpen} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
