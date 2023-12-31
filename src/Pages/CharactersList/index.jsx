import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
  /* API AUTH */
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const HASH = import.meta.env.VITE_HASH;
  /* LIMIT OF DATA */
const LIMIT = 20;
  /* LOADING GIF */
const loadingGif = 'https://phoneky.co.uk/thumbs/screensavers/down/fantasy/ironman_ldhhscp2.gif';

function CharactersListPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0); /* 0 is the beginning of the list of characters */
  /* const with empty string */ /* SETSEARCH UPDATES THE VALUE OF SEARCH */
  const [search, setSearch] = useState(''); 

  useEffect(() => {
    const params = {
      ts: 1,
      apikey: API_KEY,
      hash: HASH,
      limit: LIMIT,
      offset, /* offset as a parameter */
      /* The nameStartsWith only adds params if search is true */
      /* ... INCLUDES ALL THE PROPERTIES OF AN OBJECT INSIDE ANOTHER OBJECT */
      ...(search && { nameStartsWith: search }),
      // Conditionally set the limit only if there is no search
    ...(!search && { limit: LIMIT }),
    };
      /* GIVES US THE CHARACTERS DATA */
    axios.get(`${API_URL}/characters`, { params }) /* NEED THE PARAMS OF THE KEY */
      .then(({ data: charsData}) => {
        setCharacters(charsData.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [offset, search]); /* useEffect will be executed every time offset and search changes*/

  useEffect(() => {
    setOffset(0);
  }, [search]); /* RESETS THE OFFSET TO 0 EACH TIME SEARCH CHANGES */

  return (
    <div>
      <div className='input-search'><p className='search-title'>Search for Characters:</p>
        <input
          type="text"
          placeholder="Type here to search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='input-box'
        />
      </div>
    <div className="main-div">
      {loading && (
        <div className="loading-overlay">
          <img src={loadingGif} alt="Loading..." />
        </div>
      )}
      
      {characters.map(char => (
        <Link to={`/characters/${char.id}`} key={char.id}>
          <div className='character-div'>
            <img
              src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
              alt={char.name}
              className="thumbnail-image"
            />
            <p>{char.name}</p>
          </div>
        </Link>
      ))}
    </div>
              {/* PREVIOUS AND NEXT PAGE */}
  <div className='buttons'>
  {!search && (
    <>
      <button 
        className='buttons-box' 
        onClick={() => setOffset(currentOffset => currentOffset - LIMIT)} 
        disabled={offset === 0}
      >
        Previous Page
      </button>
      <button 
        className='buttons-box' 
        onClick={() => setOffset(currentOffset => currentOffset + LIMIT)} 
        disabled={characters.length < LIMIT}
      >
        Next Page
      </button>
    </>
  )}
</div>
      
      <div className='footer-div'><Footer/></div>
    </div>
  );
}

export default CharactersListPage;