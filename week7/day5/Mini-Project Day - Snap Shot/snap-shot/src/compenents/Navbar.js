// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">📸 Snap Shot</h1>
      <ul className="nav-links">
        <li><NavLink to="/" exact="true" activeclassname="active">Home</NavLink></li>
        <li><NavLink to="/search" activeclassname="active">Search</NavLink></li>
        <li><NavLink to="/category/mountain" activeclassname="active">Mountain</NavLink></li>
        <li><NavLink to="/category/beaches" activeclassname="active">Beaches</NavLink></li>
        <li><NavLink to="/category/birds" activeclassname="active">Birds</NavLink></li>
        <li><NavLink to="/category/food" activeclassname="active">Food</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
