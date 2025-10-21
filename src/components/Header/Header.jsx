import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import menuIcon from "../../assets/icons/Menu.png";

const Header = ({ scrollToSection, showContent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (sectionId) => {
    if (showContent && scrollToSection) {
      scrollToSection(sectionId);
    }
    closeMenu();
  };

  return (
    <div className={`header ${isMenuOpen ? "menu-open" : ""}`}>
      <nav className="navigation">
        <Link to="/" className="nav-link logo-link">
          sarrah_gandhi
        </Link>
        <div className="desktop-links">
          {showContent ? (
            <>
              <button
                className="nav-link nav-button"
                onClick={() => handleNavClick("home")}
              >
                Portfolio//
              </button>
              <Link to="/resume" className="nav-link">
                Resume
              </Link>
              <button
                className="nav-link nav-button"
                onClick={() => handleNavClick("contact")}
              >
                Contact
              </button>
            </>
          ) : (
            <>
              <Link to="/home" className="nav-link">
                Portfolio//
              </Link>
              <Link to="/resume" className="nav-link">
                Resume
              </Link>
              <Link to="/home" className="nav-link">
                Contact
              </Link>
            </>
          )}
        </div>
        <button className="hamburger-button" onClick={toggleMenu}>
          <img src={menuIcon} alt="Menu" />
        </button>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          {showContent ? (
            <>
              <button
                className="nav-link nav-button"
                onClick={() => handleNavClick("home")}
              >
                Portfolio//
              </button>
              <Link to="/resume" className="nav-link" onClick={closeMenu}>
                Resume
              </Link>
              <button
                className="nav-link nav-button"
                onClick={() => handleNavClick("contact")}
              >
                Contact
              </button>
            </>
          ) : (
            <>
              <Link to="/home" className="nav-link" onClick={closeMenu}>
                Portfolio//
              </Link>
              <Link to="/resume" className="nav-link" onClick={closeMenu}>
                Resume
              </Link>
              <Link to="/home" className="nav-link" onClick={closeMenu}>
                Contact
              </Link>
            </>
          )}
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
