// src/context/WeatherContext.js
import React, { createContext, useReducer, useEffect } from "react";

const WeatherContext = createContext();

const initialState = {
  city: "Tel Aviv",
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "ADD_FAVORITE":
      const updatedFavs = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(updatedFavs));
      return { ...state, favorites: updatedFavs };
    case "REMOVE_FAVORITE":
      const filtered = state.favorites.filter(c => c !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(filtered));
      return { ...state, favorites: filtered };
    default:
      return state;
  }
};

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
