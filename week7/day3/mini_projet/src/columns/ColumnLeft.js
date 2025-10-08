import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";

function ColumnLeft() {
  const [images, setImages] = useState([]);

  const getImages = () => {
    setImages([
      "https://picsum.photos/300/200",
      "https://picsum.photos/301/201",
    ]);
  };

  return (
    <div>
      <h3>Left column</h3>
      <Button onClick={getImages} variant="primary" className="my-3">
        Get images
      </Button>
      {images.map((img, i) => (
        <div key={i} className="my-3">
          <Image src={img} fluid />
        </div>
      ))}
    </div>
  );
}

export default ColumnLeft;
