import React from "react";
import { tasks } from "../constants/data";

const TaskCard = ({ task }) => (
  <div className="bg-white p-4 rounded-xl shadow-md space-y-1">
    <h2 className="font-semibold text-lg">{task.title}</h2>
    <p className="text-sm text-gray-700">{task.description}</p>
    <div className="text-xs text-gray-500 flex justify-between mt-2">
      <span>👤 {task.user}</span>
      <span>🏷️ {task.tag}</span>
      <span>⚡ {task.priority}</span>
    </div>
    <p className="text-[10px] text-right text-gray-400">
      {new Date(task.timestamp).toLocaleString()}
    </p>
  </div>
);

const Dashboard = () => {
  const groupedTasks = {
    "To do": tasks.filter((task) => task.status === "To do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Complete: tasks.filter((task) => task.status === "Complete"),
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* To Do Column */}
      <div>
        <h1 className="font-semibold text-2xl mb-4">To do</h1>
        <div className="space-y-4">
          {groupedTasks["To do"].map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>

      {/* In Progress Column */}
      <div>
        <h1 className="font-semibold text-2xl mb-4">In Progress</h1>
        <div className="space-y-4">
          {groupedTasks["In Progress"].map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>

      {/* Complete Column */}
      <div>
        <h1 className="font-semibold text-2xl mb-4">Completed</h1>
        <div className="space-y-4">
          {groupedTasks["Complete"].map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
