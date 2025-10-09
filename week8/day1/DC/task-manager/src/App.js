import React from 'react';
import { TaskProvider } from './TaskContext';
import TaskForm from './TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import './index.css';

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <h1>📝 Task Manager</h1>
        <TaskForm />
        <FilterButtons />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;