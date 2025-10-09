import React, { useContext } from 'react';
import { TaskContext } from './TaskContext';

const TaskList = () => {
  const { tasks, dispatch } = useContext(TaskContext);

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ marginBottom: '10px' }}>
          <span
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              marginRight: '10px',
              cursor: 'pointer',
            }}
            onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
          >
            {task.text}
          </span>
          <button onClick={() => dispatch({ type: 'REMOVE_TASK', payload: task.id })}>
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
