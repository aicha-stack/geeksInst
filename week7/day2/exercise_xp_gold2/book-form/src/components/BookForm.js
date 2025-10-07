import React, { useState } from "react";

function BookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    yearPublished: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setIsSubmitted(true);
  };

  return (
    <div>
      <h1>New Book</h1>
      {isSubmitted && <p style={{ color: "green" }}>data sent!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Author </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Genre </label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Year Published </label>
          <input
            type="number"
            name="yearPublished"
            value={formData.yearPublished}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BookForm;
