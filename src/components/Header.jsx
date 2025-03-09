import { useKanban } from '../context/KanbanContext';

const Header = ({ toggleTheme, theme }) => {
  const { currentBoard } = useKanban();
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        {currentBoard ? currentBoard.name : 'Select a Board'}
      </h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  );
};

export default Header;