import React from 'react';
import { TaskProvider } from './TaskContext';
import AddTask from './AddTask';
import TaskList from './TaskList';

function App() {
  return (
    <TaskProvider>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>✅ Task Manager</h2>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;

