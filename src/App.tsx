import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { tasks as initialTasks, statuses } from "./data";
import { Task } from "./utils/data-types";

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const columns = statuses.map((status) => {
    const tasksinColumn = initialTasks.filter((task) => task.status === status);
    return {
      title: status,
      tasks: tasksinColumn,
    };
  });

  const updateTaskPoints = (task: Task, points: number) => {
    console.log("Hello! update task points ...");

    console.log("task : ", task)
    console.log("points : ",points)

    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        console.log("Inside update")
        t.points = points
        return t;
      } else {
        return t;
      }
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="flex divide-x divide-gray-300">
      {columns.map((col, index) => (
        <div className="flex-1 p-4" key={index}>
          <div className="flex justify-between text-2xl p-2 font-bold text-gray-500">
          <h2 className="capitalize mb-4 mx-4">
            {col.title}
          </h2>
          {col.tasks.reduce((total, task) => total + (task?.points || 0), 0)}
          </div>
          {col.tasks.map((task, index) => (
            <div key={index} className="mb-2">
              <Card task={task} updateTaskPoints={updateTaskPoints} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
