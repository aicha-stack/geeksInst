import React, { createContext, useReducer } from 'react';

// Create context
export const TaskContext = createContext();

// Actions
const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';

// Reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case REMOVE_TASK:
      return state.filter(task => task.id !== action.payload);
    case TOGGLE_TASK:
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

// Provider component
export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
