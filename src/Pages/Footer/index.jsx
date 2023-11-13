import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-container">
          <Link to="/" className="navbar-logo-link">
          <img src="/marvel-logo.svg" alt="Logo" className="navbar-logo" />
          </Link>
        </div>
        <div className="text-links-container">
          <div className='navigation-links'>
            <a href="https://www.marvel.com/">Data provided by Marvel</a>
            <a href="https://developer.marvel.com/">developer.marvel.com</a>
            <Link to="/characters">CHARACTERS</Link>
            <Link to="/comics">COMICS</Link>
            <Link to="/series">SERIES</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
