import React, { Component } from "react";
import "./Exercise.css"; 

class Exercise extends Component {
  render() {
    const style_header = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    return (
      <div>
        <h1 style={style_header}>This is a styled header</h1>
        <p className="para">This is a paragraph styled with CSS.</p>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          Visit React Website
        </a>
        <form>
          <input type="text" placeholder="Type something" />
          <button>Submit</button>
        </form>
        <img
          src="https://placekitten.com/200/200"
          alt="Cute kitten"
          style={{ marginTop: "10px" }}
        />
        <ul>
          <li>First Item</li>
          <li>Second Item</li>
          <li>Third Item</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;
