import React, { useContext, useRef } from 'react';
import { TaskContext } from '../TaskContext';

const TaskForm = () => {
  const { dispatch } = useContext(TaskContext);
  const inputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const text = inputRef.current.value.trim();
    if (text !== '') {
      dispatch({ type: 'ADD_TASK', payload: text });
      inputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} placeholder="Add a new task..." />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;