// src/pages/Category.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchImages } from '../api';
import ImageGallery from '../compenents/ImageGallery';

export default function Category() {
  const { categoryName } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPhotos() {
      setLoading(true);
      const results = await fetchImages(categoryName);
      setPhotos(results);
      setLoading(false);
    }
    loadPhotos();
  }, [categoryName]);

  return (
    <div>
      <h2 style={{ padding: 20 }}>{categoryName.toUpperCase()} Photos</h2>
      {loading ? <p style={{ padding: 20 }}>Loading...</p> : <ImageGallery photos={photos} />}
    </div>
  );
}
