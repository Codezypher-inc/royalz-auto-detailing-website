import React from "react";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <div
      className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
      data-wow-delay="0.1s"
    >
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <h4 className="text-light mb-4">Contact</h4>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt me-3" />
              90 Horseshoe Lake Drive, Halifax,<br></br> NS B3S 0B4
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-3" />
              +1 (782) 882-0667
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-3" />
              +1 (902) 412-2913
            </p>
            <div className="d-flex pt-2 mb-2">
              <a className="btn btn-outline-light btn-social" href="/">
                <i className="fab fa-twitter" />
              </a>
              <a className="btn btn-outline-light btn-social" href="/">
                <i className="fab fa-facebook-f" />
              </a>
              <a className="btn btn-outline-light btn-social" href="/">
                <i className="fab fa-youtube" />
              </a>
              <a className="btn btn-outline-light btn-social" href="/">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            <Link className="btn btn-warning w-100 mt-2" to="/admin-login">
              <i className="fas fa-user-shield me-2"></i>
              Admin Login
            </Link>
          </div>

          <div className="col-lg-4 col-md-6">
            <h4 className="text-light mb-4">Opening Hours</h4>
            <h6 className="text-light">Monday - Friday:</h6>
            <p className="mb-4">09.00 AM - 09.00 PM</p>
            <h6 className="text-light">Saturday - Sunday:</h6>
            <p className="mb-0">09.00 AM - 12.00 PM</p>
          </div>

          <div className="col-lg-4 col-md-6">
            <h4 className="text-light mb-4">Quick Links</h4>
            <Link className="btn btn-link" to="/">
              Home
            </Link>
            <Link className="btn btn-link" to="/about">
              About Us
            </Link>
            <Link className="btn btn-link" to="/booking">
              Booking
            </Link>
            <Link className="btn btn-link" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-12 text-end text-md-end">
              <div className="footer-menu">
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/booking">Booking</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
