import React, { Component } from "react";
import data from "./data.json";

class Example2 extends Component {
  render() {
    return (
      <div>
        <h3>Skills:</h3>
        <ul>
          {Object.entries(data.Skills).map(([key, skills]) => (
            <li key={key}>
              <strong>{key}:</strong> {skills.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example2;
