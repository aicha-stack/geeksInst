// src/components/TaskItem.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTask, deleteTask } from '../features/tasks/tasksSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(state => state.tasks.selectedDate);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== '') {
      dispatch(editTask({ date: selectedDate, id: task.id, text: editText }));
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    dispatch(deleteTask({ date: selectedDate, id: task.id }));
  };

  return (
    <li>
      {isEditing ? (
        <input
          value={editText}
          onChange={e => setEditText(e.target.value)}
        />
      ) : (
        <span>{task.text}</span>
      )}

      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TaskItem;
