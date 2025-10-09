import React, { Component } from 'react';

// class App extends Component {
//   state = {
//     messageFromServer: ''
//   };

//   async componentDidMount() {
//     const response = await fetch('/api/hello');
//     const data = await response.json();
//     this.setState({ messageFromServer: data.message });
//   }

//   render() {
//     return (
//       <div>
//         <h1>{this.state.messageFromServer}</h1>
//       </div>
//     );
//   }
// }
class App extends Component {
  state = {
    messageFromServer: '',
    inputValue: '',
    responseMessage: ''
  };

  async handleSubmit(e) {
    e.preventDefault();

    const response = await fetch('/api/world', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: this.state.inputValue })
    });

    const data = await response.text();
    this.setState({ responseMessage: data });
  }

  render() {
    return (
      <div>
        <h1>{this.state.messageFromServer}</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
          />
          <button type="submit">Send</button>
        </form>
        <p>{this.state.responseMessage}</p>
      </div>
    );
  }
}


export default App;

