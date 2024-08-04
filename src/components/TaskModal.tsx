import React, { useState, useEffect } from "react";
import { Task } from "../utils/data-types";
import {
  HighPriorityIcon,
  MediumPriorityIcon,
  LowPriorityIcon,
} from "../utils/Icons";

interface TaskModalProps {
  task?: Task; // Make task optional for creating a new task
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void; // Function to save the task
  onDelete?: (taskId: string) => void; // Optional function to delete the task
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState<Task>({
    title: "",
    id: "",
    status: "todo",
    priority: "low",
    points: 0,
    description: "",
    workedHours: 0,
    comments: [],
  });

  useEffect(() => {
    if (task) {
      setFormData(task); // Populate form with existing task data for editing
    } else {
      setFormData({
        title: "",
        id: "",
        status: "todo",
        priority: "low",
        points: 0,
        description: "",
        workedHours: 0,
        comments: [],
      });
    }
  }, [task, isOpen]);

  const priorityIcons = {
    high: <HighPriorityIcon />,
    medium: <MediumPriorityIcon />,
    low: <LowPriorityIcon />,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: task ? task.id : `BUS-${Date.now()}` }); // Generate a unique ID for new tasks
    onClose();
  };

  const handleDelete = () => {
    if (task && onDelete) {
      onDelete(task.id); // Call delete function with task ID
      onClose(); // Close the modal after deletion
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{task ? "Edit Task" : "Create Task"}</h2>
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Points:</label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                min={0}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Priority:</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Worked Hours:</label>
              <input
                type="number"
                name="workedHours"
                value={formData.workedHours}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                min={0}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
            {task && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
              >
                Delete Task
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
