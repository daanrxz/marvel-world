import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

const API_URL = "https://gateway.marvel.com/v1/public";
const API_KEY = "fd986a65b294a48abcc1a51232b02444";
const HASH = "55660d0ce5a27d43b54fdac1c38ba2e3";
const LIMIT = 20;

const loadingGif = 'https://phoneky.co.uk/thumbs/screensavers/down/fantasy/ironman_ldhhscp2.gif';

function ComicsListPage() {
  const [comics, setComics] = useState([]);
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
      ...(search && { titleStartsWith: search })
    };

    axios.get(`${API_URL}/comics`, { params })
      .then(({ data: comicsData }) => {
        setComics(comicsData.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [offset, search]);

  return (
    <div>
      <div className='input-search'>
        <p className='search-title'>Search for Comics:</p>
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          comics.map(comic => (
            <Link key={comic.id} to={`/comics/${comic.id}`}>
              <div className='character-div'>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className="thumbnail-image"
                />
                <p>{comic.title}</p>
              </div>
            </Link>
          ))
        )}
      </div>
      <div className='buttons'>
      <button className='buttons-box' onClick={() => setOffset(currentOffset => currentOffset - LIMIT)} disabled={offset === 0}>
          Previous Page
        </button>
        <button className='buttons-box' onClick={() => setOffset(currentOffset => currentOffset + LIMIT)} disabled={comics.length < LIMIT}>
          Next Page
        </button>
      </div>
      <div className='footer-div'><Footer/></div>
    </div>
  );
}

export default ComicsListPage;
