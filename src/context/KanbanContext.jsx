import { createContext, useContext, useState, useEffect } from 'react';

const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem('kanbanBoards');
    return saved ? JSON.parse(saved) : [
      {
        id: 'board1',
        name: 'Project Board',
        columns: [
          { id: 'todo', title: 'To Do', tasks: [] },
          { id: 'inprogress', title: 'In Progress', tasks: [] },
          { id: 'done', title: 'Done', tasks: [] },
        ],
      },
    ];
  });

  const [currentBoardId, setCurrentBoardId] = useState('board1');

  useEffect(() => {
    localStorage.setItem('kanbanBoards', JSON.stringify(boards));
  }, [boards]);

  const addTask = (boardId, columnId, task) => {
    setBoards(prev => prev.map(board => 
      board.id === boardId
        ? {
            ...board,
            columns: board.columns.map(col =>
              col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
            ),
          }
        : board
    ));
  };

  const updateTask = (boardId, taskId, updates) => {
    setBoards(prev => prev.map(board => 
      board.id === boardId
        ? {
            ...board,
            columns: board.columns.map(col => ({
              ...col,
              tasks: col.tasks.map(task => task.id === taskId ? { ...task, ...updates } : task),
            })),
          }
        : board
    ));
  };

  const addColumn = (boardId, title) => {
    const newColumn = { id: Date.now().toString(), title, tasks: [] };
    setBoards(prev => prev.map(board => 
      board.id === boardId ? { ...board, columns: [...board.columns, newColumn] } : board
    ));
  };

  const moveTask = (boardId, taskId, sourceColumnId, destColumnId, index) => {
    setBoards(prev => prev.map(board => {
      if (board.id !== boardId) return board;

      const sourceCol = board.columns.find(col => col.id === sourceColumnId);
      const destCol = board.columns.find(col => col.id === destColumnId);
      if (!sourceCol || !destCol) return board;

      const task = sourceCol.tasks.find(t => t.id === taskId);
      if (!task) return board;

      const newSourceTasks = sourceCol.tasks.filter(t => t.id !== taskId);
      const newDestTasks = [...destCol.tasks];
      newDestTasks.splice(index, 0, task);

      return {
        ...board,
        columns: board.columns.map(col => {
          if (col.id === sourceColumnId) return { ...col, tasks: newSourceTasks };
          if (col.id === destColumnId) return { ...col, tasks: newDestTasks };
          return col;
        }),
      };
    }));
  };

  const addBoard = (name) => {
    const newBoard = {
      id: Date.now().toString(),
      name,
      columns: [
        { id: 'todo', title: 'To Do', tasks: [] },
        { id: 'inprogress', title: 'In Progress', tasks: [] },
        { id: 'done', title: 'Done', tasks: [] },
      ],
    };
    setBoards(prev => [...prev, newBoard]);
  };

  const currentBoard = boards.find(board => board.id === currentBoardId);

  return (
    <KanbanContext.Provider
      value={{ boards, currentBoard, setCurrentBoardId, addTask, addColumn, moveTask, addBoard, updateTask }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => useContext(KanbanContext);