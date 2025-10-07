import React, { useState } from "react";
import Input from "./Input";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.firstName.trim()) tempErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) tempErrors.lastName = "Last name is required.";
    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required.";
    if (!formData.email.trim()) tempErrors.email = "Email is required.";

    
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      tempErrors.phone = "Invalid phone number (must be 10 digits).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format.";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully ✅");
      console.log(formData);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="form-container">
      <h1>Form Validation</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Input
          label="Phone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <Input
          label="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
