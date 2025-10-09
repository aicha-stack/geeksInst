import React, { Component } from 'react';
import './App.css'; // تأكد أنك رابط CSS هنا

class Clc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: '',
      num2: '',
      operation: 'add',
      result: null,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  calculate = () => {
    const { num1, num2, operation } = this.state;
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    let result = 0;

    if (isNaN(number1) || isNaN(number2)) {
      this.setState({ result: 'Please enter valid numbers.' });
      return;
    }

    switch (operation) {
      case 'add':
        result = number1 + number2;
        break;
      case 'sub':
        result = number1 - number2;
        break;
      case 'mul':
        result = number1 * number2;
        break;
      case 'div':
        result = number2 !== 0 ? number1 / number2 : 'Cannot divide by 0';
        break;
      default:
        result = 'Invalid operation';
    }

    this.setState({ result });
  };

  render() {
    return (
      <div className="calculator-container">
        <h2>React Calculator</h2>
        <input
          type="number"
          name="num1"
          placeholder="Enter first number"
          value={this.state.num1}
          onChange={this.handleChange}
        />
        <br />
        <input
          type="number"
          name="num2"
          placeholder="Enter second number"
          value={this.state.num2}
          onChange={this.handleChange}
        />
        <br />
        <select name="operation" value={this.state.operation} onChange={this.handleChange}>
          <option value="add">Addition (+)</option>
          <option value="sub">Subtraction (-)</option>
          <option value="mul">Multiplication (×)</option>
          <option value="div">Division (÷)</option>
        </select>
        <br />
        <button onClick={this.calculate}>Calculate</button>
        <h3>Result: {this.state.result}</h3>
      </div>
    );
  }
}

export default Clc;
