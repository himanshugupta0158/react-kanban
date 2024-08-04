import React, { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { useTasks } from "./context/TaskContext";
import { Status, Task } from "./utils/data-types";
import TaskModal from "./components/TaskModal"; // Import the TaskModal

function App() {
  const { tasks, updateTask, addTask, deleteTask } = useTasks(); // Get tasks and context functions
  const statuses: Status[] = ["todo", "in-progress", "done"]; // Define your statuses
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentStatus, setCurrentStatus] = useState<Status | null>(null); // Track current status for new task

  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status);
    return {
      status: status,
      tasks: tasksInColumn,
    };
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const task = tasks.find((task) => task.id === id);
    if (task) {
      updateTask({ ...task, status: status });
    }
  };

  const openModalForCreate = (status: Status) => {
    setCurrentTask(null); // Clear current task for creating a new task
    setCurrentStatus(status); // Set the status for the new task
    setIsModalOpen(true);
  };

  const openModalForEdit = (task: Task) => {
    setCurrentTask(task); // Set current task for editing
    setCurrentStatus(task.status); // Set the status for editing
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (currentTask) {
      updateTask(task); // Update existing task
    } else {
      addTask({ ...task, status: currentStatus || "todo" }); // Add new task with the specified status
    }
  };

  return (
    <div className="flex divide-x divide-gray-300">
      {columns.map((col, index) => (
        <div
          className="flex-1 p-4"
          key={index}
          onDrop={(e) => handleDrop(e, col.status)}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="flex justify-between items-center mb-4 mx-2">
            <h2 className="capitalize text-2xl font-bold text-gray-500">
              {col.status}
            </h2>
            <span className="ml-2 text-rose-600 bg-rose-50 p-2">
              Total Story Points : {col.tasks.reduce(
                (total, task) => Number(total) + Number(task?.points || 0),
                0
              )}
            </span>
          </div>
          <div
            className="m-2 bg-gray-200 rounded-lg text-center text-2xl cursor-pointer"
            onClick={() => openModalForCreate(col.status)}
          >
            +
          </div>

          {col.tasks.map((task, index) => (
            <div key={index} className="mb-2">
              <Card
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
                openModalForEdit={openModalForEdit}
              />
            </div>
          ))}
        </div>
      ))}
      <TaskModal
        task={currentTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
}

export default App;
