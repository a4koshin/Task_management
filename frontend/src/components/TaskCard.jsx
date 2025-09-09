import React from "react";
import { useAuth } from "../context/AuthProvider";

const TaskCard = ({ task, onCardOpen }) => {
  const { fullname } = useAuth();

  // Color coding based on priority
  const priorityColor = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  // Color coding based on status
  const statusColor = {
    todo: "bg-gray-200 text-gray-800",
    pending: "bg-blue-50 text-blue-800",
    completed: "bg-indigo-50 text-indigo-800",
  };

  return (
    <div
      onClick={() => onCardOpen(task)}
      className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
    >
      {/* Title */}
      <h2 className="font-semibold text-lg text-gray-800 mb-2">{task.title}</h2>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {task.description}
      </p>

      {/* Badges */}
      <div className="flex justify-between items-center mb-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            priorityColor[task.priority]
          }`}
        >
          {task.priority.toUpperCase()}
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColor[task.status]
          }`}
        >
          {task.status.replace("-", " ").toUpperCase()}
        </span>
      </div>

      {/* Footer */}
      <div className="flex justify-end">
        <p className="text-[10px] text-gray-900 font-medium">{fullname}</p>
      </div>
    </div>
  );
};

export default TaskCard;
