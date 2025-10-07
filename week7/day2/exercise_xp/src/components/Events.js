import React, { useState } from "react";

function Events() {
  // Part I
  const clickMe = () => {
    alert("I was clicked");
  };

  // Part II
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      alert(`You pressed Enter! Value: ${e.target.value}`);
    }
  };

  // Part III
  const [isToggleOn, setIsToggleOn] = useState(true);

  const toggle = () => {
    setIsToggleOn((prevState) => !prevState);
  };

  return (
    <div>
      <h1>Exercise 2: Events</h1>

      {/* Part I */}
      <button onClick={clickMe}>Click Me</button>

      <br /><br />

      {/* Part II */}
      <input type="text" placeholder="Type and press Enter" onKeyDown={handleKeyDown} />

      <br /><br />

      {/* Part III */}
      <button onClick={toggle}>
        {isToggleOn ? "ON" : "OFF"}
      </button>
    </div>
  );
}

export default Events;
