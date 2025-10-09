// src/components/ImageGallery.js
import React from 'react';
import './ImageGallery.css';

export default function ImageGallery({ photos }) {
  return (
    <div className="gallery">
      {photos.map(photo => (
        <div key={photo.id} className="photo-item">
          <img src={photo.src.medium} alt={photo.photographer} />
        </div>
      ))}
    </div>
  );
}
