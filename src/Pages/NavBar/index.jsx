import React from 'react'
import { Link } from 'react-router-dom'


function NavBar() {
  return (
    <nav className="navbar">
      <img src="public/marvel-logo.svg" alt="Logo" className="navbar-logo" />
      <div className="navbar-links">
        <Link to="/characters" className="navbar-link">Characters</Link>
        <Link to="/comics" className="navbar-link">Comics</Link>
        <Link to="/series" className="navbar-link">Series</Link>
        <Link to="/suggestions" className='navbar-link'>Suggestions</Link>
      </div>
    </nav>
  )
}

export default NavBar