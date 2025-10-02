import React from "react";

function BootstrapCard({ title, imageUrl, buttonLabel, buttonUrl, description }) {
  return (
    <div className="card m-5" style={{ width: "30rem" }}>
      <img className="card-img-top" src={imageUrl} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={buttonUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
          {buttonLabel}
        </a>
      </div>
    </div>
  );
}

export default BootstrapCard;
