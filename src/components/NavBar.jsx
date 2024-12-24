import React from "react";
import { Link } from "react-router";
import "../css/Navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="linkers">
          Movie App
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="linkers">
          Home
        </Link>
        <Link to="/favorites" className="linkers">
          Favorites
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
