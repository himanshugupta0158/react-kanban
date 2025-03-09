import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './KanbanCard';
import { useState } from 'react';
import CreateTaskModal from './CreateTaskModal';

const KanbanColumn = ({ column, onTaskClick }) => {
  const { setNodeRef } = useDroppable({ id: column.id, data: { columnId: column.id } });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow w-72 flex-shrink-0 border border-gray-200 dark:border-gray-600"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{column.title}</h2>
      <div className="space-y-2 min-h-[100px]">
        {column.tasks.map(task => (
          <KanbanCard
            key={task.id}
            task={task}
            columnId={column.id}
            onClick={() => onTaskClick(task)} // Pass task directly
          />
        ))}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-2 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
      >
        + Add Task
      </button>
      {isModalOpen && (
        <CreateTaskModal columnId={column.id} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default KanbanColumn;