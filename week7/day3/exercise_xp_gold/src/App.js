import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Error Boundary Demo</h1>
      <ErrorBoundary />
    </div>
  );
}

export default App;
