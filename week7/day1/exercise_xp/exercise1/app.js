import React from "react";

function App() {
  const myelement = <h1>I Love JSX!</h1>;
  const sum = 5 + 5;

  return (
    <div className="App">
      <p>Hello World!</p>
      {myelement}
      <p>React is {sum} times better with JSX</p>
    </div>
  );
}

export default App;
