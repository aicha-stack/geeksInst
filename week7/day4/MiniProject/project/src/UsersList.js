import React, { Component } from "react";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => this.setState({ users: data, isLoaded: true }))
      .catch((err) => {
        console.error("❌ Error loading users", err);
        this.setState({ isLoaded: true });
      });
  }

  render() {
    const { users, isLoaded } = this.state;

    return (
      <div style={{ padding: "20px" }}>
        <h2>👥 Users List</h2>
        {!isLoaded ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default UsersList;
