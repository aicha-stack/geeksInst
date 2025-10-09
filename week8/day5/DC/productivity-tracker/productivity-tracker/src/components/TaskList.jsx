import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTasksByCategory,
  selectCompletedTasks
} from '../features/tracker/trackerSelectors';
import {
  addTask,
  deleteTask,
  toggleComplete,
  editTask,
  selectSelectedCategory
} from '../features/tracker/trackerSlice';

export default function TaskList() {
  const tasks = useSelector(selectTasksByCategory);
  const completed = useSelector(selectCompletedTasks);
  const selectedCategory = useSelector(selectSelectedCategory);
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAdd = () => {
    if (newTask.trim() !== '') {
      dispatch(addTask({ text: newTask, category: selectedCategory }));
      setNewTask('');
    }
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSave = () => {
    dispatch(editTask({ id: editingId, text: editText }));
    setEditingId(null);
  };

  return (
    <div>
      <h3>Completed: {completed}</h3>

      <input
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Add task"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {editingId === task.id ? (
              <>
                <input value={editText} onChange={e => setEditText(e.target.value)} />
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
                <button onClick={() => handleEdit(task.id, task.text)}>Edit</button>
              </>
            )}
            <button onClick={() => dispatch(toggleComplete(task.id))}>✔</button>
            <button onClick={() => dispatch(deleteTask(task.id))}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
