import React, { useContext, useRef, useState } from 'react';
import { TaskContext } from '../TaskContext';

const TaskItem = ({ task }) => {
  const { dispatch } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const saveEdit = () => {
    const newText = editRef.current.value.trim();
    if (newText !== '') {
      dispatch({ type: 'EDIT_TASK', payload: { id: task.id, text: newText } });
      setIsEditing(false);
    }
  };

  return (
    <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      {isEditing ? (
        <>
          <input defaultValue={task.text} ref={editRef} />
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          <span onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}>
            {task.text}
          </span>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      <button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}>Delete</button>
    </li>
  );
};

export default TaskItem;