import { Task } from "../utils/data-types";

const Card = ({ task }: { task: Task }) => {
  return (
    <div className="border rounded-lg p-2 m-2 bg-gray-100" draggable>
      <div className="text-base font-medium py-2 text-start">{task.title}</div>
      <div className="flex gap-4 justify-between py-2 text-gray-500">
        <div>{task.id}</div>
        <div>{task.points}</div>
      </div>
    </div>
  );
};

export default Card;
