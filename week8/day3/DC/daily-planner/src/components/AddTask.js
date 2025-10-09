import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

const AddTask = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const selectedDate = useSelector(state => state.tasks.selectedDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTask({ date: selectedDate, text }));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Add new task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTask;