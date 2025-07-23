import React, { useState, useEffect } from "react";
import { getTasks } from "../services/taskService";
import TaskCard from "../components/TaskCard";
import Heading from "../components/Heading";
const Pending = () => {
  const [pendings, setPending] = useState([]);

  const fetchTaskFromDB = async () => {
    const response = await getTasks();
    setPending(response);
  };

  useEffect(() => {
    fetchTaskFromDB();
  }, []);

  const pendingTasks = pendings.filter((task) => task.status === "pending");

  return (
    <>
      <Heading heading={"Pending page"} />
      <div className="flex  items-center gap-8 flex-wrap">
        {pendingTasks.map((task) => (
          <TaskCard key={task.taskId} task={task} />
        ))}
      </div>
    </>
  );
};

export default Pending;
