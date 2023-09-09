import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo"></div>
        </div>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} PetPals Shelter. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
