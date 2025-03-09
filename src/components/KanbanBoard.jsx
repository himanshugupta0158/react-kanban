import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import AddColumnButton from './AddColumnButton';
import TaskDetailsModal from './TaskDetailsModal';
import { useKanban } from '../context/KanbanContext';

const KanbanBoard = () => {
  const { currentBoard, moveTask } = useKanban();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const sourceColumnId = active.data.current.columnId;
    const destColumnId = over.data.current.columnId;
    const index = over.data.current.index || 0;

    moveTask(currentBoard.id, taskId, sourceColumnId, destColumnId, index);
  };

  if (!currentBoard) return <div className="p-6 text-gray-800 dark:text-gray-200">Select a board from the sidebar</div>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6 flex gap-4 overflow-x-auto">
        {currentBoard.columns.map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
            onTaskClick={task => setSelectedTask({ ...task, columnId: column.id })} // Set task for modal
          />
        ))}
        <AddColumnButton boardId={currentBoard.id} />
      </div>
      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </DndContext>
  );
};

export default KanbanBoard;