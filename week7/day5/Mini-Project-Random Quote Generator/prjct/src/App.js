import React, { Component } from "react";
import RandomQuoteGenerator from "./components/RandomQuoteGenerator";

class App extends Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>Random Quote Generator</h1>
        <RandomQuoteGenerator />
      </div>
    );
  }
}

export default App;

