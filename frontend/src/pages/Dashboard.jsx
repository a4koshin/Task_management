import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { getTasks } from "../services/taskService";
import Header from "../components/Header";
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTaskFromDB = async () => {
    const response = await getTasks();
    setTasks(response);
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
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* To Do Column */}
        <div>
          <h1 className="font-semibold text-2xl mb-4">To do</h1>
          <div className="space-y-4">
            {groupedTasks["To do"].map((task) => (
              <TaskCard key={task.taskId} task={task} />
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div>
          <h1 className="font-semibold text-2xl mb-4">Pending</h1>
          <div className="space-y-4">
            {groupedTasks["In Progress"].map((task) => (
              <TaskCard key={task.taskId} task={task} />
            ))}
          </div>
        </div>

        {/* Complete Column */}
        <div>
          <h1 className="font-semibold text-2xl mb-4">Completed</h1>
          <div className="space-y-4">
            {groupedTasks["Complete"].map((task) => (
              <TaskCard key={task.taskId} task={task} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
