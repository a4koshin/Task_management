import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Modal from "./Modal";

const Header = () => {
  const { fullname } = useAuth();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleAddTask = async () => {
    const taskData = {
      title: taskTitle,
      description: taskDescription,
      status: status || "todo",
    };

    try {
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      console.log("Task added successfully");
      setShowTaskModal(false);
      setTaskTitle("");
      setTaskDescription("");
      setStatus("");
    } catch (error) {
      console.error("Error adding task:", error);
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

        <div className="relative w-full max-w-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search"
            className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            <span>{today}</span>
          </div>

          <span className="text-gray-700 text-sm font-medium">
            Welcome, {fullname}
          </span>

          <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm uppercase">
            {fullname?.charAt(0)}
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
