import React from "react";
import { Task } from "../utils/data-types";
import {
  HighPriorityIcon,
  MediumPriorityIcon,
  LowPriorityIcon,
} from "../utils/Icons";

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
  if (!isOpen) return null;

  const priorityIcons = {
    high: <HighPriorityIcon />,
    medium: <MediumPriorityIcon />,
    low: <LowPriorityIcon />,
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex divide-x">
          <div className="w-2/3 pr-6">
            <div className="mb-4">
              <p className="text-gray-700">
                {task.description || "No description provided."}
              </p>
            </div>
          </div>
          <div className="w-1/3 pl-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Assigned to:</span>
                <span>John Doe</span> {/* Dummy user */}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Assigned by:</span>
                <span>Jane Smith</span> {/* Dummy user */}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Story Points:</span>
                <span>{task.points}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Priority:</span>
                <span>{priorityIcons[task.priority]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
