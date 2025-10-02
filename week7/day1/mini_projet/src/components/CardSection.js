import React from "react";

function CardSection({ icon, title, text }) {
  return (
    <div className="d-flex align-items-center p-4">
      <div className="me-3" style={{ fontSize: "50px", color: "#E74C3C" }}>
        <i className={icon}></i>
      </div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default CardSection;
