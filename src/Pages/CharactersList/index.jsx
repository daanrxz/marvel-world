import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = "https://gateway.marvel.com/v1/public";
const API_KEY = "fd986a65b294a48abcc1a51232b02444";
const HASH = "55660d0ce5a27d43b54fdac1c38ba2e3";
const LIMIT = 20;

const loadingGif = 'https://phoneky.co.uk/thumbs/screensavers/down/fantasy/ironman_ldhhscp2.gif';

function CharactersListPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params = {
      ts: 1,
      apikey: API_KEY,
      hash: HASH,
      limit: LIMIT,
      offset,
      ...(search && { nameStartsWith: search })
    };

    axios.get(`${API_URL}/characters`, { params })
      .then(({ data }) => {
        setCharacters(data.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [offset, search]);

  useEffect(() => {
    setOffset(0);
  }, [search]);

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
      <div className='buttons'>
        <button className='buttons-box' onClick={() => setOffset(o => Math.max(0, o - LIMIT))} disabled={offset === 0}>
          Previous Page
        </button>
        <button className='buttons-box' onClick={() => setOffset(o => o + LIMIT)} disabled={characters.length < LIMIT}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default CharactersListPage;