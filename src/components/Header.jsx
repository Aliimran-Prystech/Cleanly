import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/Header.scss";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isBookingPage = location.pathname === "/booking";

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo-link">
          <img
            src="https://cleanly-700a6.firebaseapp.com/static/media/logo.8ff229fcc20562bae2d7.png"
            alt="Cleanly"
          />
        </Link>

        <div className="header__desktop-actions">
          {isBookingPage ? (
            <>
              {/* Booking Page Phone */}
              <a href="tel:8007108420" className="header__phone">
                800-710-8420
              </a>

              {/* Login */}
              <button className="header__login-btn">Log In</button>
            </>
          ) : (
            <>
              {/* Home Navigation */}
              <nav className="header__nav">
                <a href="#how-it-works">How It Works</a>

                <a href="#services">Our Services</a>
              </nav>

              {/* Book a Cleaning */}
              <Link to="/booking" className="header__book-btn">
                Book a Cleaning
              </Link>

              {/* Login */}
              <button className="header__login-btn">Login</button>
            </>
          )}
        </div>

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

      <div className={`header__mobile-menu ${menuOpen ? "active" : ""}`}>
        <nav className="header__mobile-nav">
          {isBookingPage ? (
            <>
              {/* Booking Page Phone */}
              <a
                href="tel:8007108420"
                className="header__phone"
                onClick={closeMenu}
              >
                800-710-8420
              </a>

              {/* Login */}
              <button className="header__login-btn" onClick={closeMenu}>
                Log In
              </button>
            </>
          ) : (
            <>
              {/* Home Navigation */}
              <a href="#how-it-works" onClick={closeMenu}>
                How It Works
              </a>

              <a href="#services" onClick={closeMenu}>
                Our Services
              </a>

              {/* Book a Cleaning */}
              <Link
                to="/booking"
                className="header__book-btn"
                onClick={closeMenu}
              >
                Book a Cleaning
              </Link>

              {/* Login */}
              <button className="header__login-btn" onClick={closeMenu}>
                Log In
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
