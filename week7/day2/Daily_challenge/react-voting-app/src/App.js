import React, { useState } from "react";
import "./App.css";

function App() {
  
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 },
  ]);

  const addVote = (index) => {
    const newLanguages = [...languages];
    newLanguages[index].votes += 1;
    setLanguages(newLanguages);
  };

  return (
    <div className="container">
      <h1>React Voting App</h1>
      {languages.map((lang, index) => (
        <div key={index} className="card">
          <h2>{lang.name}</h2>
          <p>Votes: {lang.votes}</p>
          <button onClick={() => addVote(index)}>Vote</button>
        </div>
      ))}
    </div>
  );
}

export default App;
