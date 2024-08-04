// TaskContext.tsx

import React, { createContext, useContext, useState } from "react";
import { Task } from "../utils/data-types";

// Initial dummy tasks data
const initialTasks: Task[] = [
  {
    title: "Do Market Research",
    id: "BUS-1",
    status: "todo",
    priority: "low",
    points: 5,
    description: "Conduct thorough market research to understand customer needs.",
    workedHours: 3,
    comments: ["Need to gather more data.", "Discuss with the team."],
  },
  { 
    title: "Develop Business Strategy",
    id: "BUS-2",
    status: "in-progress",
    priority: "high",
    points: 4,
    description: "Develop a comprehensive business strategy for the next quarter.",
    workedHours: 12,
    comments: ["Align with marketing goals.", "Review with stakeholders."],
  },
  {
    title: "Develop Marketing Strategy",
    id: "BUS-3",
    status: "done",
    priority: "low",
    points: 8,
    description: "Draft a marketing strategy that aligns with business objectives.",
    workedHours: 6,
    comments: ["Completed review with the team."],
  },
  {
    title: "Competitor Analysis",
    id: "BUS-4",
    status: "todo",
    priority: "medium",
    points: 2,
    description: "Analyze competitor strategies and market positioning.",
    workedHours: 1,
    comments: ["Gather more data on competitors."],
  },
  {
    title: "Do Market Research",
    id: "BUS-5",
    status: "todo",
    priority: "high",
    points: 5,
    description: "Conduct thorough market research to understand customer needs.",
    workedHours: 4,
    comments: ["Need to gather more data.", "Discuss with the team."],
  },
  {
    title: "Develop Business Strategy",
    id: "BUS-6",
    status: "in-progress",
    priority: "low",
    points: 3,
    description: "Develop a comprehensive business strategy for the next quarter.",
    workedHours: 9,
    comments: ["Align with marketing goals.", "Review with stakeholders."],
  },
  {
    title: "Develop Marketing Strategy",
    id: "BUS-7",
    status: "done",
    priority: "high",
    points: 8,
    description: "Draft a marketing strategy that aligns with business objectives.",
    workedHours: 7,
    comments: ["Completed review with the team."],
  },
  {
    title: "Competitor Analysis",
    id: "BUS-8",
    status: "todo",
    priority: "medium",
    points: 2,
    description: "Analyze competitor strategies and market positioning.",
    workedHours: 2,
    comments: ["Gather more data on competitors."],
  },
];

// Context Types
interface TaskContextType {
  tasks: Task[];
  updateTask: (updatedTask: Task) => void;
  addTask: (newTask: Task) => void;
  deleteTask: (taskId: string) => void;
}

// Create Task Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Custom hook for accessing task context
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

// Task Provider Component
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, updateTask, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
