import React, { Component } from "react";

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  };

  render() {
    if (this.state.counter === 5) {
      
      throw new Error("I crashed!");
    }

    return (
      <div className="counter" onClick={this.handleClick}>
        <h2>Counter: {this.state.counter}</h2>
        <p>Click to increase</p>
      </div>
    );
  }
}

export default BuggyCounter;
