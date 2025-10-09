import React from 'react';
import CategorySelector from './components/CategorySelector';
import TaskList from './components/TaskList';

function App() {
  return (
    <div>
      <h1>📝 Productivity Tracker</h1>
      <CategorySelector />
      <TaskList />
    </div>
  );
}

export default App;
