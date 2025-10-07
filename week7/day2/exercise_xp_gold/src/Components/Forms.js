import React, { useState } from "react";

function Forms() {
  
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const [textarea, setTextarea] = useState("This is some initial content.");
  const [selectedCar, setSelectedCar] = useState("Volvo");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge(value);

    if (value && isNaN(value)) {
      setErrormessage("Age must be numeric!");
    } else {
      setErrormessage("");
    }
  };

 
  const mySubmitHandler = (e) => {
    e.preventDefault(); 
    if (!errormessage) {
      alert(`Username: ${username}, Age: ${age}`);
    } else {
      alert("Please fix errors before submitting!");
    }
  };

  
  const handleTextareaChange = (e) => {
    setTextarea(e.target.value);
  };

  
  const handleSelectChange = (e) => {
    setSelectedCar(e.target.value);
  };

  
  let header = null;
  if (username || age) {
    header = (
      <h2>
        {username && `Name: ${username}`} {age && `| Age: ${age}`}
      </h2>
    );
  }

  return (
    <div>
      <h1>React Forms Exercise</h1>

      
      {header}

      <form onSubmit={mySubmitHandler}>

        <div>
          <label>
            Name:
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your name"
            />
          </label>
        </div>

        <div>
          <label>
            Age:
            <input
              type="text"
              name="age"
              value={age}
              onChange={handleAgeChange}
              placeholder="Enter your age"
            />
          </label>
          
          {errormessage && <p style={{ color: "red" }}>{errormessage}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      <br />

     
      <div>
        <label>
          Message:
          <textarea value={textarea} onChange={handleTextareaChange} rows="4" cols="50" />
        </label>
      </div>

      <br />

      
      <div>
        <label>
          Select Car:
          <select value={selectedCar} onChange={handleSelectChange}>
            <option value="Volvo">Volvo</option>
            <option value="Saab">Saab</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
          </select>
        </label>
        <p>Selected Car: {selectedCar}</p>
      </div>
    </div>
  );
}

export default Forms;
