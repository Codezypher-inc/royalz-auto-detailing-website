import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function SiteHeader({ activePage = "" }) {
  const { isAdmin } = useAdminAuth();

  const isActive = (pageName) => (activePage === pageName ? " active" : "");

  return (
    <>
      <div className="container-fluid bg-light p-0">
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-map-marker-alt text-primary me-2" />
              <small>90 Horseshoe Lake Drive, Halifax, NS B3S 0B4</small>
            </div>
            <div className="h-100 d-inline-flex align-items-center py-3">
              <small className="far fa-clock text-primary me-2" />
              <small>+1 (782) 882-0667</small>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-phone-alt text-primary me-2" />
              <small>+1 (902) 412-2913</small>
            </div>
            <div className="h-100 d-inline-flex align-items-center">
              <a className="btn btn-sm-square bg-white text-primary me-1" href="/">
                <i className="fab fa-facebook-f" />
              </a>
              <a className="btn btn-sm-square bg-white text-primary me-1" href="/">
                <i className="fab fa-twitter" />
              </a>
              <a className="btn btn-sm-square bg-white text-primary me-1" href="/">
                <i className="fab fa-linkedin-in" />
              </a>
              <a className="btn btn-sm-square bg-white text-primary me-0" href="/">
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
          <img
            src="/img/royallogo.png"
            alt="Royal Auto Detailing"
            style={{ height: "60px" }}
          />
        </Link>

        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <NavLink to="/" className={`nav-item nav-link${isActive("home")}`}>
              Home
            </NavLink>
            <NavLink to="/about" className={`nav-item nav-link${isActive("about")}`}>
              About Us
            </NavLink>
            <NavLink
              to="/booking"
              className={`nav-item nav-link${isActive("booking")}`}
            >
              Booking
            </NavLink>
            <NavLink
              to="/contact"
              className={`nav-item nav-link${isActive("contact")}`}
            >
              Contact Us
            </NavLink>
            {isAdmin && (
              <Link
                to="/admin-dashboard"
                className="nav-item nav-link text-warning fw-bold"
              >
                <i className="fas fa-user-shield me-2"></i>
                Admin Dashboard
              </Link>
            )}
          </div>

          <Link
            to="/booking"
            className="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
          >
            Book Now
            <i className="fa fa-arrow-right ms-3" />
          </Link>
        </div>
      </nav>
    </>
  );
}
