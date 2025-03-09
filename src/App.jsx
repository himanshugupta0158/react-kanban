import { useState } from 'react';
import { KanbanProvider } from './context/KanbanContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BoardPage from './pages/BoardPage';

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <KanbanProvider>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
        <Sidebar />
        <div className="ml-64">
          <Header toggleTheme={toggleTheme} theme={theme} />
          <BoardPage />
        </div>
      </div>
    </KanbanProvider>
  );
};

export default App;