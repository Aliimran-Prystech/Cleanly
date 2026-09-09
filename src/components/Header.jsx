import { useState } from "react";
import "../styles/components/Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <a href="/" className="header__logo-link">
          <img
            src="https://cleanly-700a6.firebaseapp.com/static/media/logo.8ff229fcc20562bae2d7.png"
            alt="Cleanly"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="header__desktop-actions">
          <nav className="header__nav">
            <a href="#how-it-works">How It Works</a>
            <a href="#services">Our Services</a>
          </nav>

          <Link to="/booking" className="header__book-btn">
            Book a Cleaning
          </Link>

          {/* <button className="header__book-btn">Book a Cleaning</button> */}

          <button className="header__login-btn">Login</button>
        </div>

        {/* Hamburger Button */}
        <button
          className={`header__menu-btn ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`header__mobile-menu ${menuOpen ? "active" : ""}`}>
        <nav className="header__mobile-nav">
          <a href="#how-it-works" onClick={closeMenu}>
            How It Works
          </a>

          <a href="#services" onClick={closeMenu}>
            Our Services
          </a>

          <Link to="/booking" className="header__book-btn" onClick={closeMenu}>
            Book a Cleaning
          </Link>

          <button className="header__login-btn" onClick={closeMenu}>
            Log In
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
