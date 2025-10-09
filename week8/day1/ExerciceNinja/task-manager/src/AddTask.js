import React, { useContext, useState } from 'react';
import { TaskContext } from './TaskContext';

const AddTask = () => {
  const [input, setInput] = useState('');
  const { dispatch } = useContext(TaskContext);

  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TASK', payload: input });
      setInput('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        placeholder="New Task"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddTask;
