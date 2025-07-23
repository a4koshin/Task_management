import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Modal from "./Modal";
import { createTask as createTaskAPI } from "../services/taskService";
import toast from "react-hot-toast";

const Header = ({ oneTaskAdded }) => {
  const { fullname } = useAuth();

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  const handleAddTask = async () => {
    if (!taskTitle || !status) {
      alert("Please provide both title and status for the task.");
      return;
    }

    try {
      const taskData = {
        title: taskTitle,
        description: taskDescription,
        dueDate: dueDate,
        status: status,
      };

      const response = await createTaskAPI(taskData);

      if (response.ok || response.status === 201) {
        toast.success("Task added successfully!");
        setTaskTitle("");
        setTaskDescription("");
        setDueDate("");
        setStatus("");
        setShowTaskModal(false);
        oneTaskAdded();
      } else {
        toast.error("Failed to add task.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("An error occurred while adding the task.");
    }
  };

  const openModal = () => setShowTaskModal(true);

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="p-4">
      <div className="flex items-center justify-between w-full">
        <button
          onClick={openModal}
          className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>New task</span>
        </button>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>

            <span>{today}</span>
          </div>

          <span className="text-gray-700 text-sm font-medium">
            Welcome, {fullname}
          </span>

          <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm uppercase">
            {fullname.charAt(0)}
          </div>
        </div>
      </div>

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
          <input
            type="datetime-local"
            placeholder="Task title"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
          />
          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
          >
            <option value="">Choose Status</option>
            <option value="todo">Todo</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
