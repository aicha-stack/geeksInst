import React from "react";
import Car from "./components/Car";
import Events from "./components/Events";
import Phone from "./components/Phone";
import Color from "./components/Color";

function App() {
  const carinfo = { name: "Ford", model: "Mustang" };

  return (
    <div className="App">
   
      <div className="blog">
        <h1>Exercise 1: Car Component</h1>
        <Car carInfo={carinfo} />
      </div>

     
      <div className="blog">
        <h1>Exercise 2: Events</h1>
        <Events />
      </div>

      
      <div className="blog">
        <h1>Exercise 3: Phone</h1>
        <Phone />
      </div>

    
      <div className="blog">
        <h1>Exercise 4: useEffect Hook</h1>
        <Color />
      </div>
    </div>
  );
}

export default App;
