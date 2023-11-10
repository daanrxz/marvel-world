import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
        <div>
            <img src='public/marvel-logo.svg'></img><br></br>
            <a href="">Data provided by Marvel.</a><br></br>
            <a href="">developer.marvel.com</a>
            <div>
        <Link to="/characters" >CHARACTERS</Link>
        <Link to="/comics" >COMICS</Link>
        <Link to="/series" >SERIES</Link>
      </div>
        </div>
    
    </footer>
  )
}

export default Footer