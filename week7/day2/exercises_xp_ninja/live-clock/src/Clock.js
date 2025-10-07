import React, { useState, useEffect } from "react";

function Clock() {
 
  const [currentDate, setCurrentDate] = useState(new Date());

  const tick = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const formattedTime = currentDate.toLocaleTimeString();

  return (
    <div className="clock-container">
      <h1>HELLO,WORLD!</h1>
      <p><h2>It is </h2>{formattedTime}</p>
    </div>
  );
}

export default Clock;
