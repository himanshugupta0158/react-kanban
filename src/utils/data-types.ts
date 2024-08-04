// data-types.ts

type Status = "todo" | "in-progress" | "done";
type Priority = "low" | "medium" | "high";

type Task = {
  title: string;
  id: string;
  status: Status;
  priority: Priority;
  points?: number;
  description?: string; // Added description
  workedHours?: number;  // Added worked hours
  comments?: string[];    // Added comments
};

export type { Status, Task, Priority };
