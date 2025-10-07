import React, { useState, useEffect } from "react";

function Color() {
  const [favoriteColor, setFavoriteColor] = useState("red");

  useEffect(() => {
    alert("useEffect reached");
  }, [favoriteColor]);

  const changeColor = () => {
    setFavoriteColor("blue");
  };

  return (
    <div>
      <h1>Exercise 4: useEffect Hook</h1>
      <h2>My favorite color is {favoriteColor}</h2>
      <button onClick={changeColor}>Change color to blue</button>
    </div>
  );
}

export default Color;
