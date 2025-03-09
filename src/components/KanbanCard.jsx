import { useDraggable } from '@dnd-kit/core';
import ReactMarkdown from 'react-markdown';

const KanbanCard = ({ task, columnId, onClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { columnId },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 p-3 rounded shadow cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition border border-gray-200 dark:border-gray-600"
    >
      <div className="flex items-center">
        <div
          {...listeners}
          {...attributes}
          className="w-6 h-6 mr-2 cursor-grab"
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
          </svg>
        </div>
        <div onClick={() => onClick(task)} className="flex-1">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">{task.title}</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-invert">
            <ReactMarkdown>{task.description.slice(0, 50) + (task.description.length > 50 ? '...' : '')}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;