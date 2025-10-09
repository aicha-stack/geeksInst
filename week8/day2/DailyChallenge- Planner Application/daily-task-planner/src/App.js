// src/App.js
import React from 'react';
import DatePicker from './components/DatePicker';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>📅 Daily Task Planner</h1>
      <DatePicker />
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;

