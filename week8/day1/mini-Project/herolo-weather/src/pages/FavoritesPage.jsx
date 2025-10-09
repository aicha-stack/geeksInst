// src/pages/FavoritesPage.jsx
import React, { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import { Typography, List, ListItem, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { state, dispatch } = useContext(WeatherContext);
  const navigate = useNavigate();

  const goToCity = (city) => {
    dispatch({ type: "SET_CITY", payload: city });
    navigate("/");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h4">Favorite Cities</Typography>
      <List>
        {state.favorites.map((city, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => goToCity(city)}>
              {city}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FavoritesPage;
