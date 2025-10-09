import React, { Component } from "react";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }))
      .catch((error) => this.setState({ errorMsg: "❌ Error loading posts" }));
  }

  render() {
    const { posts, errorMsg } = this.state;

    return (
      <div style={{ padding: "20px" }}>
        <h2>📃 Posts List</h2>
        {posts.length ? (
          posts.map((post) => (
            <div key={post.id} style={{ marginBottom: "10px" }}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>{errorMsg || "Loading posts..."}</p>
        )}
      </div>
    );
  }
}

export default PostList;
