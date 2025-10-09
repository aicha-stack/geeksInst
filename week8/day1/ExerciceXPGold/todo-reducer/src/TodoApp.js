import React, { useReducer, useState } from 'react';

// Actions
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { id: Date.now(), text: action.payload }];
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: ADD_TODO, payload: input });
      setInput('');
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: REMOVE_TODO, payload: id });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>📝 Todo List</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task..."
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={handleAdd} style={{ marginLeft: '10px', padding: '10px' }}>
        Add
      </button>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: '10px' }}>
            {todo.text}
            <button
              onClick={() => handleRemove(todo.id)}
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ❌ Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

