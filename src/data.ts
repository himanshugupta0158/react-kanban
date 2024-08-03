import { Task, Status, Priority } from "./utils/data-types";

export const statuses: Status[] = ["todo", "in-progress", "done"];

export const priorities: Priority[] = ["low", "medium", "high"];

export const MAX_POINTS = 45;

export const tasks: Array<Task> = [
  {
    title: "Do Market Research",
    id: "BUS-1",
    status: "todo",
    priority: 'low',
    points: 5,
  },
  {
    title: "Develop Business Strategy",
    id: "BUS-2",
    status: "in-progress",
    priority: "high",
    points: 42,
  },
  {
    title: "Develop Marketing Strategy",
    id: "BUS-3",
    status: "done",
    priority: "low",
    points: 8,
  },
  {
    title: "Competitior analysis",
    id: "BUS-4",
    status: "todo",
    priority: "medium",
    points: 2,
  },
  {
    title: "Do Market Research",
    id: "BUS-5",
    status: "todo",
    priority: "high",
    points: 5,
  },
  {
    title: "Develop Business Strategy",
    id: "BUS-6",
    status: "in-progress",
    priority: "low",
    points: 3,
  },
  {
    title: "Develop Marketing Strategy",
    id: "BUS-7",
    status: "done",
    priority: "high",
    points: 8,
  },
  {
    title: "Competitior analysis",
    id: "BUS-8",
    status: "todo",
    priority: "medium",
    points: 2,
  },
];
