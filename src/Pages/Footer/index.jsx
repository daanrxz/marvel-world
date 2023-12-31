import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-container">
          <Link to="/" className="navbar-logo-link">
          <img src="/marvel-logo-black-and-white.png" alt="Logo" className="navbar-logo" />
          </Link>
        </div>
        <div className="text-links-container">
          <div className='navigation-links'>
            <a className='footer-anchors' href="https://www.marvel.com/" target="_blank">Data provided by Marvel</a>
            <a className='footer-anchors' href="https://developer.marvel.com/" target="_blank">developer.marvel.com</a>
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
