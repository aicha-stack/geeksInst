import React, { Component } from "react";

class FavoriteColor extends Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000);
  }

  shouldComponentUpdate() {
    console.log("in shouldComponentUpdate");
    return true; 
  }

  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null; 
  }

  
  componentDidUpdate() {
    console.log("after update");
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  render() {
    console.log("in render");
    return (
      <div style={{ textAlign: "center" }}>
        <h2>My Favorite Color is {this.state.favoriteColor}</h2>
        <button onClick={this.changeColor}>Change to Blue</button>
      </div>
    );
  }
}

export default FavoriteColor;
