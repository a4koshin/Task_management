import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-100 h-auto mb-6">
      <h2 className="font-semibold text-lg">{task.title}</h2>
      <p className="text-sm text-gray-700">{task.description}</p>
      <div className="text-xs text-gray-500 flex justify-between mt-2">
        <span>{task.dueDate}</span>
      </div>
      <p className="text-[10px] text-right text-gray-400">
        {new Date(task.timestamp).toLocaleString()}
      </p>
    </div>
  );
};

export default TaskCard;
