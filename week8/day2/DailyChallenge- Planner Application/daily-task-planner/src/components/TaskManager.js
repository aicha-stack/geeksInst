import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask, deleteTask } from '../actions/taskActions';

export default function TaskManager() {
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const selectedDate = useSelector((state) => state.tasks.selectedDate);
  const tasks = useSelector((state) => state.tasks.tasksByDate[selectedDate] || []);
  const dispatch = useDispatch();

  const handleAddOrEdit = () => {
    if (!input.trim()) return;
    if (editingIndex === null) {
      dispatch(addTask(selectedDate, input));
    } else {
      dispatch(editTask(selectedDate, editingIndex, input));
      setEditingIndex(null);
    }
    setInput('');
  };

  return (
    <div>
      <h3>Tasks for {selectedDate}</h3>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAddOrEdit}>
        {editingIndex === null ? 'Add Task' : 'Save'}
      </button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {task}
            <button onClick={() => {
              setInput(task);
              setEditingIndex(i);
            }}>✏️</button>
            <button onClick={() => dispatch(deleteTask(selectedDate, i))}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
