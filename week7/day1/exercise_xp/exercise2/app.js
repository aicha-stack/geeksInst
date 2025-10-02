import React from "react";
import UserFavoriteAnimals from "./UserFavoriteAnimals";

function App() {
  const user = {
    firstName: "Bob",
    lastName: "Dylan",
    favAnimals: ["Horse", "Turtle", "Elephant", "Monkey"]
  };

  return (
    <div>
      <h3>{user.firstName}</h3>
      <h3>{user.lastName}</h3>
      <UserFavoriteAnimals favAnimals={user.favAnimals} />
    </div>
  );
}

export default App;
