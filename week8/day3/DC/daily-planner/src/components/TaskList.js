// src/components/TaskList.js
import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = () => {
  const selectedDate = useSelector(state => state.tasks.selectedDate);
  const tasks = useSelector(state => state.tasks.tasksByDate[selectedDate] || []);

  return (
    <ul>
      {tasks.length === 0 ? (
        <li>No tasks for this day</li>
      ) : (
        tasks.map(task => <TaskItem key={task.id} task={task} />)
      )}
    </ul>
  );
};

export default TaskList;
