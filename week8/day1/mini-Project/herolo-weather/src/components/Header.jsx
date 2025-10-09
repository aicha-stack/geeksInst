// src/components/Header.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Weather App
        </Typography>
        <Button color="inherit" component={Link} to="/">Weather</Button>
        <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

