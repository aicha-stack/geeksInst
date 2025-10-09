import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './compenents/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Category from './pages/Category';

const App = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async (query) => {
    const API_KEY = 'Kk7uAexRt7NxuNXp44s98nVjmLwzD97YQQ8xJZWpchat8OXDRuKLfhAz'; 
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=30`;
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: API_KEY,
        },
      });

      const data = await res.json();
      setImages(data.photos);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/search"
          element={<Search onSearch={fetchImages} images={images} />}
        />
        <Route
          path="/category/:categoryName"
          element={<Category fetchImages={fetchImages} images={images} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
