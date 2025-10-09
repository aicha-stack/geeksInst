// src/App.js
import React from 'react';
import DatePicker from './components/DatePicker';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h1>📅 Daily Planner</h1>
      <DatePicker />
      <AddTask />
      <TaskList />
    </div>
  );
};

export default App;

