import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      alert("Please fill in all fields!");
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ firstName: "", lastName: "", phone: "", email: "" });
    setIsSubmitted(false);
  };

  return (
    <div className="container">
      {!isSubmitted ? (
        <>
          <h1>Welcome!</h1>
          <p>Please provide your information below.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <>
          <h1>Thank you!</h1>
          <div className="user-data">
            <p><strong>First Name:</strong> {formData.firstName}</p>
            <p><strong>Last Name:</strong> {formData.lastName}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Email:</strong> {formData.email}</p>
          </div>
          <button onClick={handleReset}>Reset</button>
        </>
      )}
    </div>
  );
}

export default App;
