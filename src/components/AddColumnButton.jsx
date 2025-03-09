import { useState } from 'react';
import { useKanban } from '../context/KanbanContext';

const AddColumnButton = ({ boardId }) => {
  const { addColumn } = useKanban();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      addColumn(boardId, title);
      setIsOpen(false);
      setTitle('');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow w-72 flex-shrink-0 text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition border border-gray-200 dark:border-gray-600"
      >
        + Add Column
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Add New Column</h3>
            <input
              type="text"
              placeholder="Column Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
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
      )}
    </>
  );
};

export default AddColumnButton;