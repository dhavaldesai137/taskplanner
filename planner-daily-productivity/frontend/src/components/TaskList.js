import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/api/tasks/${id}`);
    fetchTasks();
  };

  const handleToggleComplete = async (id, completed) => {
    await axios.put(`http://localhost:4000/api/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Completed: {task.completed.toString()}</p>
          <button onClick={() => handleToggleComplete(task._id, task.completed)}>
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
