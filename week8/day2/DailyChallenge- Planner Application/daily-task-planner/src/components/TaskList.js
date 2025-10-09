// src/components/TaskList.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TaskList = () => {
  const dispatch = useDispatch();
  const { selectedDate, tasksByDate } = useSelector((state) => state.tasks);
  const tasks = tasksByDate[selectedDate] || [];

  const handleDelete = (index) => {
    dispatch({ type: 'DELETE_TASK', payload: { date: selectedDate, index } });
  };

  return (
    <div>
      <h2>Tasks for {selectedDate}</h2>
      <ul>
        {tasks.length === 0 ? (
          <li>No tasks for this day.</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => handleDelete(index)}>❌</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
