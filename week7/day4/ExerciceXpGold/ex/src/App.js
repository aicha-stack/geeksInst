import React from "react";
import UserForm from "./UserForm"; // fetch version
import PostFormAxios from "./PostFormAxios"; // axios version

function App() {
  return (
    <div>
      <UserForm />
      <hr />
      <PostFormAxios />
    </div>
  );
}

export default App;