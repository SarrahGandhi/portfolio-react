import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import menuIcon from "../../assets/icons/Menu.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={`header ${isMenuOpen ? "menu-open" : ""}`}>
      <nav className="navigation">
        <Link to="/" className="nav-link logo-link">
          sarrah_gandhi
        </Link>
        <div className="desktop-links">
          <a href="/#portfolio" className="nav-link">
            Portfolio//
          </a>
          <Link to="/resume" className="nav-link">
            Resume
          </Link>
          <a href="/#contact" className="nav-link">
            Contact
          </a>
        </div>
        <button className="hamburger-button" onClick={toggleMenu}>
          <img src={menuIcon} alt="Menu" />
        </button>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <a href="/#portfolio" className="nav-link" onClick={closeMenu}>
            Portfolio//
          </a>
          <Link to="/resume" className="nav-link" onClick={closeMenu}>
            Resume
          </Link>
          <a href="/#contact" className="nav-link" onClick={closeMenu}>
            Contact
          </a>
        </div>
      </div>

      <div className="corner-box top-left"></div>
      <div className="corner-box top-right"></div>
      <div className="corner-box bottom-left"></div>
      <div className="corner-box bottom-right"></div>
    </div>
  );
};

export default Header;
