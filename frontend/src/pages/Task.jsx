import React, { useState, useEffect } from "react";
import { getTasks } from "../services/taskService";
import TaskCard from "../components/TaskCard";
import Heading from "../components/Heading";
const Task = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTaskFromDB = async () => {
    const response = await getTasks();
    setTasks(response);
  };

  useEffect(() => {
    fetchTaskFromDB();
  }, []);

  const todoTasks = tasks.filter((task) => task.status === "todo");

  return (
    <>
      <Heading heading={"To do page"} />
      <div className="flex  items-center gap-8 flex-wrap">
        {todoTasks.map((task) => (
          <TaskCard key={task.taskId} task={task} />
        ))}
      </div>
    </>
  );
};

export default Task;
