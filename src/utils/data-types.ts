type Status = "todo" | "in-progress" | "done";

type Task = {
  title: string;
  id: string;
  status: Status;
  points?: number;
};

export type { Status, Task };
