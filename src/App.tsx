import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { tasks as initialTasks, statuses } from "./data";
import { Status, Task } from "./utils/data-types";

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status); // Use the state tasks here
    return {
      status: status,
      tasks: tasksInColumn,
    };
  });

  const updateTask = (task: Task) => {
    console.log("updating task ...", task);

    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? { ...t, ...task } : t; // Merge existing task with updated properties
    });

    console.log(updatedTasks);
    setTasks(updatedTasks); // Set the updated tasks array
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const task = tasks.find((task) => task.id === id);
    if (task) {
      updateTask({ ...task, status: status });
    }
  };

  const [currentlyHoveringOver, setCurrentlyHoveringOver] =
    useState<Status | null>(null);
  const handleDragEnter = (status: Status) => {
    setCurrentlyHoveringOver(status);
  };

  return (
    <div className="flex divide-x divide-gray-300">
      {columns.map((col, index) => (
        <div
          className="flex-1 p-4"
          key={index}
          onDrop={(e) => handleDrop(e, col.status)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => handleDragEnter(col.status)}
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
