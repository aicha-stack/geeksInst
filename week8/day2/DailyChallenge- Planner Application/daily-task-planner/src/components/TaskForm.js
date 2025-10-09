// src/components/TaskForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TaskForm = () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.tasks.selectedDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    dispatch({ type: 'ADD_TASK', payload: { date: selectedDate, task } });
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={task}
        placeholder="Enter task..."
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
