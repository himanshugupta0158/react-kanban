import "./App.css";
import Card from "./components/Card";
import { tasks, statuses } from "./data";

function App() {
  const columns = statuses.map((status) => {
    const tasksinColumn = tasks.filter((task) => task.status === status);
    return {
      title: status,
      tasks: tasksinColumn,
    };
  });

  return (
    <div className="flex divide-x divide-gray-300">
      {columns.map((col, index) => (
        <div className="flex-1 p-4" key={index}>
          <h1 className="text-xl font-bold capitalize mb-4 mx-4">{col.title}</h1>
          {col.tasks.map((task, index) => (
            <div key={index} className="mb-2">
              <Card task={task} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
