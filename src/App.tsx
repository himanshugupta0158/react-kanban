import React from "react";
import "./App.css";
import Card from "./components/Card";
import { useTasks } from "./context/TaskContext";
import { Status } from "./utils/data-types";

function App() {
  const { tasks, updateTask } = useTasks(); // Get tasks and updateTask from context
  const statuses: Status[] = ["todo", "in-progress", "done"]; // Define your statuses

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

  return (
    <div className="flex divide-x divide-gray-300">
      {columns.map((col, index) => (
        <div
          className="flex-1 p-4"
          key={index}
          onDrop={(e) => handleDrop(e, col.status)}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="flex justify-between text-2xl p-2 font-bold text-gray-500">
            <h2 className="capitalize mb-4 mx-4">{col.status}</h2>
            {col.tasks.reduce((total, task) => total + (task?.points || 0), 0)}
          </div>
          
          {col.tasks.map((task, index) => (
            <div key={index} className="mb-2">
              <Card task={task} updateTask={updateTask} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
