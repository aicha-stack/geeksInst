// App.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import './App.css';

function App() {
  const { theme } = useContext(ThemeContext);

  const appStyles = {
    backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
    color: theme === 'light' ? '#000' : '#fff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={appStyles}>
      <h1>Theme Switcher</h1>
      <ThemeSwitcher />
    </div>
  );
}

export default App;

