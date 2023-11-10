import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = "https://gateway.marvel.com/v1/public";
const API_KEY = "fd986a65b294a48abcc1a51232b02444";
const HASH = "55660d0ce5a27d43b54fdac1c38ba2e3";
const LIMIT = 20;

function ComicsListPage() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/comics`, {
      params: { ts: 1, apikey: API_KEY, hash: HASH, limit: LIMIT, offset }
    }).then(({ data }) => {
      setComics(data.data.results);
      setLoading(false);
    }).catch(error => {
      console.error("Error fetching data: ", error);
      setLoading(false);
    });
  }, [offset]);

  return (
    <div className="main-div">
      {loading ? <p>Loading...</p> : comics.map(comic => (
        <Link to={`/comics/${comic.id}`}>
        <div key={comic.id} className='character-div'>
          
          <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} style={{ width: '100px', height: '100px' }} className="thumbnail-image"/>
          <h2>{comic.title}</h2>
        </div>
        </Link>
      ))}
      <button onClick={() => setOffset(o => Math.max(0, o - LIMIT))} disabled={offset === 0}>Previous</button>
      <button onClick={() => setOffset(o => o + LIMIT)} disabled={comics.length < LIMIT}>Next</button>
    </div>
  );
}
export default ComicsListPage