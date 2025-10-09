// src/pages/Search.js
import React, { useState } from 'react';
import ImageGallery from '../compenents/ImageGallery';
import './Search.css';

const Search = ({ onSearch, images }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="search-container">
      <h2>Search</h2>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {images && images.length > 0 && <ImageGallery images={images} />}
    </div>
  );
};

export default Search;
