import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { getTasks, updateTask, deleteTask } from "../services/taskService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openCard = (task) => {
    let formattedDueDate = task.dueDate;
    if (task.dueDate) {
      formattedDueDate = new Date(task.dueDate).toISOString().slice(0, 16);
    }
    setSelectedTask({ ...task, dueDate: formattedDueDate });
    setIsOpen(true);
  };

  const closeCard = () => {
    setIsOpen(false);
    setSelectedTask(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchTaskFromDB = async () => {
    try {
      const response = await getTasks();
      setTasks(response);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const updateTaskFromDB = async () => {
    try {
      const updatedData = {
        ...selectedTask,
        dueDate: selectedTask.dueDate
          ? new Date(selectedTask.dueDate).toISOString()
          : null,
      };

      await updateTask(selectedTask._id, updatedData);
      await fetchTaskFromDB();
      closeCard();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTaskFromDB = async () => {
    try {
      await deleteTask(selectedTask._id);
      await fetchTaskFromDB();
      closeCard();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
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
      {isOpen && selectedTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative space-y-4">
            <button
              onClick={closeCard}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={selectedTask.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={selectedTask.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
            />

            <select
              name="status"
              value={selectedTask.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
            >
              <option value="">Choose Status</option>
              <option value="todo">Todo</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <select
              name="priority"
              value={selectedTask.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
            >
              <option value="">Choose priority</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>

            <div className="flex justify-between pt-2">
              <button
                onClick={updateTaskFromDB}
                className="bg-indigo-700 text-white px-4 py-2 rounded-xl hover:bg-indigo-600"
              >
                Update
              </button>
              <button
                onClick={deleteTaskFromDB}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={closeCard}
                className="bg-gray-300 text-black px-4 py-2 rounded-xl hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* To Do */}
        <div>
          <h1 className="font-semibold text-2xl mb-4">To do</h1>
          <div className="space-y-4">
            {groupedTasks["To do"].map((task) => (
              <TaskCard key={task._id} task={task} onCardOpen={openCard} />
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <h1 className="font-semibold text-2xl mb-4">Pending</h1>
          <div className="space-y-4">
            {groupedTasks["In Progress"].map((task) => (
              <TaskCard key={task._id} task={task} onCardOpen={openCard} />
            ))}
          </div>
        </div>

        {/* Completed */}
        <div>
          <h1 className="font-semibold text-2xl mb-4">Completed</h1>
          <div className="space-y-4">
            {groupedTasks["Complete"].map((task) => (
              <TaskCard key={task._id} task={task} onCardOpen={openCard} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
