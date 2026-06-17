import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
  className="navbar navbar-expand-lg sticky-top border-bottom"
  style={{ backgroundColor: "#FFF" }}
>
  <div className="container-fluid px-4">
    <Link className="navbar-brand" to="/">
      <img
        src="media/images/TradeHub_Logo.png"
        alt="Logo"
        style={{ height: "40px", width: "auto" }}
      />
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div
      className="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Signup
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar;