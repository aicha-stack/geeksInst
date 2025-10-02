import React from "react";

const planets = ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune'];

function Planets() {
  return (
    <div className="container mt-4">
      <h2>Planets List</h2>
      <ul className="list-group">
        {planets.map((planet, index) => (
          <li key={index} className="list-group-item">
            {planet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Planets;
