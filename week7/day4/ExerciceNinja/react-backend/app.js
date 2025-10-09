import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data });
      });
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
