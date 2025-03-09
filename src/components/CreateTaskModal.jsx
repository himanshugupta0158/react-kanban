import { useState } from 'react';
import { useKanban } from '../context/KanbanContext';

const CreateTaskModal = ({ columnId, onClose }) => {
  const { addTask, currentBoard } = useKanban();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        comments: [],
      };
      addTask(currentBoard.id, columnId, newTask);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 border border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Add New Task</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <textarea
          placeholder="Description (Markdown supported)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;