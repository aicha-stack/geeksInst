// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeatherProvider } from "./context/WeatherContext";
import WeatherPage from "./pages/WeatherPage";
import FavoritesPage from "./pages/FavoritesPage";
import Header from "./components/Header";

function App() {
  return (
    <WeatherProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WeatherPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </WeatherProvider>
  );
}

export default App;
