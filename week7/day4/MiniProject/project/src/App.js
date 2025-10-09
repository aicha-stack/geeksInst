import React from "react";
import PostList from "./PostList";
import UsersList from "./UsersList";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>📦 Fetch API Exercise</h1>
      <UsersList />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
