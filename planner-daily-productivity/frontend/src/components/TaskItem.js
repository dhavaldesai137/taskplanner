import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, fetchTasks }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error.response ? error.response.data : error.message);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await axios.put(`http://localhost:4000/api/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task completion:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <li>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Priority: {task.priority}</p>
        <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'None'}</p>
        <p>Category: {task.category}</p>
        <p>Reminder: {task.reminder ? new Date(task.reminder).toLocaleString() : 'None'}</p>
        <p>Completed: {task.completed.toString()}</p>
      </div>
      <div>
        <button onClick={handleToggleComplete}>
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
