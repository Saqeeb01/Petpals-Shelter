import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">
            Petpals Shelter
          </Link>
          <div className={`menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {/* <li>
              <Link to="/" className="nav-link">Home</Link>
            </li> */}
            {/* <li>
              <Link to="/browse" className="nav-link">Browse Pets</Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">Register</Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
