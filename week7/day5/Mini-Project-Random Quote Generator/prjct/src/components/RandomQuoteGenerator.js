import React, { Component } from "react";

const quotes = [
  { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { quote: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
  { quote: "Spread love everywhere you go.", author: "Mother Teresa" },
];

const colors = ["#16a085", "#27ae60", "#2c3e50", "#f39c12", "#e74c3c", "#9b59b6", "#FB6964"];

class RandomQuoteGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuoteIndex: 0,
      currentColor: colors[0],
    };
  }

  getRandomIndex = () => {
    let index;
    do {
      index = Math.floor(Math.random() * quotes.length);
    } while (index === this.state.currentQuoteIndex);
    return index;
  };

  getRandomColor = () => {
    let color;
    do {
      color = colors[Math.floor(Math.random() * colors.length)];
    } while (color === this.state.currentColor);
    return color;
  };

  handleNewQuote = () => {
    this.setState({
      currentQuoteIndex: this.getRandomIndex(),
      currentColor: this.getRandomColor(),
    });
  };

  render() {
    const { currentQuoteIndex, currentColor } = this.state;
    const { quote, author } = quotes[currentQuoteIndex];

    const style = {
      backgroundColor: currentColor,
      color: currentColor,
      minHeight: "200px",
      padding: "20px",
      borderRadius: "10px",
      transition: "all 3.5s ease",
      textAlign: "center",
      margin: "40px auto",
      maxWidth: "600px",
    };

    return (
      <div style={{ ...style, color: currentColor }}>
        <h2 style={{ color: currentColor, fontStyle: "italic" }}>"{quote}"</h2>
        <p style={{ color: currentColor, fontWeight: "bold", marginBottom: "20px" }}>- {author}</p>
        <button
          onClick={this.handleNewQuote}
          style={{
            backgroundColor: currentColor,
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
        >
          New Quote
        </button>
      </div>
    );
  }
}

export default RandomQuoteGenerator;
