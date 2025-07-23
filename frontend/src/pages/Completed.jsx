import React, { useState, useEffect } from "react";
import { getTasks } from "../services/taskService";
import TaskCard from "../components/TaskCard";
import Heading from "../components/Heading";

const Completed = () => {
  const [Completed, setCompleted] = useState([]);

  const fetchTaskFromDB = async () => {
    const response = await getTasks();
    setCompleted(response);
  };

  useEffect(() => {
    fetchTaskFromDB();
  }, []);

  const CompletedTasks = Completed.filter((task) => task.status === "pending");

  return (
    <>
      <Heading heading={"Completed page"} />
      <div className="flex  items-center gap-8 flex-wrap">
        {CompletedTasks.map((task) => (
          <TaskCard key={task.taskId} task={task} />
        ))}
      </div>
    </>
  );
};

export default Completed;
