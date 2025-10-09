import React, { Component } from "react";
import axios from "axios";

class PostFormAxios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      title: "",
      body: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userId, title, body } = this.state;

    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        userId,
        title,
        body,
      })
      .then((res) => {
        console.log("✅ Axios Post Response:", res.data);
      })
      .catch((err) => {
        console.error("❌ Axios Error:", err);
      });
  };

  render() {
    const { userId, title, body } = this.state;

    return (
      <div style={{ padding: "20px" }}>
        <h2>Exercise 1: POST JSON Data (axios)</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={userId}
            onChange={this.handleChange}
          />
          <br />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
          />
          <br />
          <textarea
            name="body"
            placeholder="Body"
            value={body}
            onChange={this.handleChange}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default PostFormAxios;
