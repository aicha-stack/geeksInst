import React from "react";

function FormComponent({ data, handleChange, handleSubmit }) {
  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Sample form</h2>

        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
        />
        <br />

        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
        />
        <br />

        <input
          type="number"
          placeholder="Age"
          name="age"
          value={data.age}
          onChange={handleChange}
        />
        <br />

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={data.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={data.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>
        <br />

        <label>
          Select your destination
          <br />
          <select
            name="destination"
            value={data.destination}
            onChange={handleChange}
          >
            <option value="">-- Please Choose a destination --</option>
            <option value="Japan">Japan</option>
            <option value="Brazil">Brazil</option>
            <option value="France">France</option>
          </select>
        </label>
        <br />

        <fieldset>
          <legend>Dietary restrictions:</legend>

          <label>
            <input
              type="checkbox"
              name="nutsFree"
              checked={data.nutsFree}
              onChange={handleChange}
            />
            Nuts free
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              name="lactoseFree"
              checked={data.lactoseFree}
              onChange={handleChange}
            />
            Lactose free
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              name="vegan"
              checked={data.vegan}
              onChange={handleChange}
            />
            Vegan
          </label>
        </fieldset>
        <br />

        <button type="submit">Submit</button>
      </form>

      <div className="info">
        <h3>Entered information:</h3>
        <p>
          <strong>Your name:</strong> {data.firstName} {data.lastName}
        </p>
        <p>
          <strong>Your age:</strong> {data.age}
        </p>
        <p>
          <strong>Your gender:</strong> {data.gender}
        </p>
        <p>
          <strong>Your destination:</strong> {data.destination}
        </p>
        <p>
          <strong>Your dietary restrictions:</strong>
        </p>
        <p>**Nuts free: {data.nutsFree ? "Yes" : "No"}</p>
        <p>**Lactose free: {data.lactoseFree ? "Yes" : "No"}</p>
        <p>**Vegan meal: {data.vegan ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default FormComponent;
