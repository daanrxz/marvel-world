import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-container">
          <Link to="/" className="navbar-logo-link">
          <img src="/marvel-logo.png" alt="Logo" className="navbar-logo" />
          </Link>
        </div>
        <div className="text-links-container">
          <div className='navigation-links'>
            <a href="https://www.marvel.com/">Data provided by Marvel</a>
            <a href="https://developer.marvel.com/">developer.marvel.com</a>
            <Link to="/characters">Characters</Link>
            <Link to="/comics">Comics</Link>
            <Link to="/series">Series</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
