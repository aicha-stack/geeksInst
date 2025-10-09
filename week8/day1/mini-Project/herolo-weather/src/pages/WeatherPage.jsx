// src/pages/WeatherPage.jsx
import React, { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import { Button, Typography } from "@mui/material";

const WeatherPage = () => {
  const { state, dispatch } = useContext(WeatherContext);
  const isFavorite = state.favorites.includes(state.city);

  const toggleFavorite = () => {
    dispatch({
      type: isFavorite ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
      payload: state.city,
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h4">{state.city} Weather</Typography>
      <Typography variant="body1">☀️ 26°C - Clear Sky (dummy data)</Typography>
      <Button
        variant="contained"
        color={isFavorite ? "secondary" : "primary"}
        onClick={toggleFavorite}
        sx={{ mt: 2 }}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    </div>
  );
};

export default WeatherPage;
