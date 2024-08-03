type Status = "todo" | "in-progress" | "done";
type Priority = "low" | "medium" | "high";

type Task = {
  title: string;
  id: string;
  status: Status;
  priority: Priority;
  points?: number;
};

export type { Status, Task, Priority };
