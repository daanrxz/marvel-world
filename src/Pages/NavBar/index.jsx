import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar({ onSearchChange }) {
  const [search, setSearch] = useState('');
  const location = useLocation();

  useEffect(() => {
    setSearch(''); // Clear search when navigating
  }, [location]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  const showSearchBar =
    location.pathname === '/characters' ||
    location.pathname === '/comics' ||
    location.pathname === '/series';

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-link">
        <img src="/marvel-logo.png" alt="Logo" className="navbar-logo" />
      </Link>
      <div className="navbar-links">
        <Link to="/characters" className="navbar-link">
          Characters
        </Link>
        <Link to="/comics" className="navbar-link">
          Comics
        </Link>
        <Link to="/series" className="navbar-link">
          Series
        </Link>
        <Link to="/suggestions" className="navbar-link">
          Have an idea?
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
