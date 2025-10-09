import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to 📸 Snap Shot</h1>
      <p>Discover amazing photos of nature, food, birds, and more!</p>
      <button onClick={() => navigate('/search')}>Start Searching</button>
    </div>
  );
};

export default Home;
