import React from "react";

function Contact() {
  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <h2 className="text-center mb-4">Contact us</h2>
      <div className="row">
        <div className="col-md-6">
          <p>Contact us and we will get back to you within 24 hours.</p>
          <p><i className="fas fa-map-marker-alt"></i> Company Name</p>
          <p><i className="fas fa-phone"></i> +256 778 800 900</p>
          <p><i className="fas fa-envelope"></i> company@gmail.com</p>
        </div>
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="email address" />
            </div>
            <div className="mb-3">
              <textarea className="form-control" rows="5" placeholder="comment"></textarea>
            </div>
            <button type="submit" className="btn btn-danger w-100">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
