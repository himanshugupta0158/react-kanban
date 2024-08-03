import { useState } from "react";
import { Task } from "../utils/data-types";
import {
  HighPriorityIcon,
  LowPriorityIcon,
  MediumPriorityIcon,
} from "../utils/Icons";

const Card = ({
  task,
  updateTaskPoints,
}: {
  task: Task;
  updateTaskPoints: (task: Task, points: number) => void;
}) => {
  // const [points, setPoints] = useState(task.points || 0);
  const points = task.points || 0;

  const priorityIcons = {
    high: <HighPriorityIcon />,
    medium: <MediumPriorityIcon />,
    low: <LowPriorityIcon />,
  };

  return (
    <div className="border rounded-lg p-2 m-2 bg-gray-100" draggable>
      <div className="text-base font-medium py-2 text-start">{task.title}</div>
      <div className="flex gap-4 justify-between py-2 text-gray-500">
        <div className="flex gap-2">
          <div>{task.id}</div>
          {priorityIcons[task.priority]}
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="font-bold bg-gray-300 rounded-lg px-2"
            onClick={(e) => {
              e.preventDefault();
              updateTaskPoints(task, points - 1);
            }}
          >
            -
          </button>
          <div className="font-bold">{points}</div>
          <button
            className="font-bold bg-gray-300 rounded-lg px-2"
            onClick={(e) => {
              e.preventDefault();
              updateTaskPoints(task, points + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
