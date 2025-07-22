import React from "react";
import { tasks } from "../constants/data";

const TaskCard = ({ task }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm space-y-1">
    <h2 className="font-semibold">{task.title}</h2>
    <p className="text-sm text-gray-600">{task.description}</p>
    <div className="text-xs text-gray-500 flex flex-wrap gap-2">
      <span>🧑 {task.user}</span>
      <span>🏷️ {task.tag}</span>
      <span>⚡ {task.priority}</span>
    </div>
    <p className="text-[10px] text-right text-gray-400">
      {new Date(task.timestamp).toLocaleString()}
    </p>
  </div>
);

const Inprogress = () => {
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");

  return (
    <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {inProgressTasks.length ? (
        inProgressTasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p className="text-gray-500 italic">No tasks in progress.</p>
      )}
    </main>
  );
};

export default Inprogress;
