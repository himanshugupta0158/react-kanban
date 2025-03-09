import { useKanban } from '../context/KanbanContext';
import { useState } from 'react';

const Sidebar = () => {
  const { boards, setCurrentBoardId, addBoard } = useKanban();
  const [newBoardName, setNewBoardName] = useState('');

  const handleAddBoard = () => {
    if (newBoardName.trim()) {
      addBoard(newBoardName);
      setNewBoardName('');
    }
  };

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 shadow-lg p-4 fixed">
      <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Boards</h2>
      <ul className="space-y-2">
        {boards.map(board => (
          <li
            key={board.id}
            onClick={() => setCurrentBoardId(board.id)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded text-gray-800 dark:text-gray-200"
          >
            {board.name}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <input
          type="text"
          placeholder="New Board Name"
          value={newBoardName}
          onChange={e => setNewBoardName(e.target.value)}
          className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <button
          onClick={handleAddBoard}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
        >
          Add Board
        </button>
      </div>
    </div>
  );
};

export default Sidebar;