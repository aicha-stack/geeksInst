import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Styles du carousel
import "./App.css";

// Import des images depuis le dossier src/images
import hongKong from "./images/hongkong.jpg";
import macao from "./images/macao.jpg";
import japan from "./images/japan.jpg";
import lasVegas from "./images/lasvegas.jpg";

function App() {
  return (
    <div className="App">
      <h1 className="text-center mt-4">Travel Carousel</h1>
      <div className="carousel-container">
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          <div>
            <img src={hongKong} alt="Hong Kong" />
            <p className="legend">Hong Kong</p>
          </div>
          <div>
            <img src={macao} alt="Macao" />
            <p className="legend">Macao</p>
          </div>
          <div>
            <img src={japan} alt="Japan" />
            <p className="legend">Japan</p>
          </div>
          <div>
            <img src={lasVegas} alt="Las Vegas" />
            <p className="legend">Las Vegas</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default App;
