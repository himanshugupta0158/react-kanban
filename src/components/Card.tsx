import { useState } from "react";
import { Task } from "../utils/data-types";
import {
  HighPriorityIcon,
  LowPriorityIcon,
  MediumPriorityIcon,
} from "../utils/Icons";
import { MAX_POINTS } from "../data";
import TaskModal from "./TaskModal";

const Card = ({
  task,
  updateTask,
}: {
  task: Task;
  updateTask: (task: Task) => void;
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const priorityIcons = {
    high: <HighPriorityIcon />,
    medium: <MediumPriorityIcon />,
    low: <LowPriorityIcon />,
  };

  const updatePoints = (
    e: React.MouseEvent<HTMLButtonElement>,
    direction: "up" | "down"
  ) => {
    e.preventDefault();
    const currentPoints = task.points || 0;
    const newPoint = direction === "up" ? currentPoints + 1 : currentPoints - 1;

    if (newPoint < 0 || newPoint > MAX_POINTS) return;

    updateTask({ ...task, points: newPoint });
  };

  const handlePriorityChange = (newPriority: string) => {
    updateTask({ ...task, priority: newPriority });
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="border rounded-lg p-2 m-2 bg-gray-100"
    >
      <div className="flex justify-between items-center">
        <div className="text-base font-medium py-2 text-start">
          <div onClick={() => setIsEditingTitle(true)}>{task.title}</div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-gray-300 rounded px-2 py-1">
          View
        </button>
      </div>
      {isEditingTitle && (
        <input
          autoFocus
          className="w-full"
          onBlur={() => setIsEditingTitle(false)}
          value={task.title}
          onChange={(e) => updateTask({ ...task, title: e.target.value })}
        />
      )}
      <div className="flex gap-4 justify-between py-2 text-gray-500">
        <div className="flex gap-2">
          <div>{task.id}</div>
          <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="cursor-pointer">
            {priorityIcons[task.priority]}
          </div>
          {isDropdownOpen && (
            <div className="absolute bg-white border rounded shadow-lg">
              <div onClick={() => handlePriorityChange("high")} className="p-2 cursor-pointer hover:bg-gray-200">High</div>
              <div onClick={() => handlePriorityChange("medium")} className="p-2 cursor-pointer hover:bg-gray-200">Medium</div>
              <div onClick={() => handlePriorityChange("low")} className="p-2 cursor-pointer hover:bg-gray-200">Low</div>
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="font-bold bg-gray-300 rounded-lg px-2"
            onClick={(e) => updatePoints(e, "down")}
          >
            -
          </button>
          <div className="font-bold">{task.points}</div>
          <button
            className="font-bold bg-gray-300 rounded-lg px-2"
            onClick={(e) => updatePoints(e, "up")}
          >
            +
          </button>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal task={task} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Card;
