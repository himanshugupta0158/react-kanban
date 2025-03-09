import { useState } from 'react';
import { useKanban } from '../context/KanbanContext';
import ReactMarkdown from 'react-markdown';

const TaskDetailsModal = ({ task, onClose }) => {
  const { updateTask, currentBoard } = useKanban();
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        text: comment,
        author: 'User',
        timestamp: new Date().toLocaleString(),
      };
      updateTask(currentBoard.id, task.id, { comments: [...(task.comments || []), newComment] });
      setComment('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full border border-gray-200 dark:border-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">{task.title}</h2>
        <div className="prose dark:prose-invert text-gray-800 dark:text-gray-200 mb-4">
          <ReactMarkdown>{task.description}</ReactMarkdown>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Comments</h3>
          {task.comments && task.comments.length > 0 ? (
            task.comments.map(comment => (
              <div key={comment.id} className="bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2">
                <p className="text-gray-800 dark:text-gray-200">{comment.text}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{comment.author} - {comment.timestamp}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
          )}
        </div>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
          >
            Close
          </button>
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;