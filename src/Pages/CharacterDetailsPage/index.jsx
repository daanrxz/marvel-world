import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../Footer';

const loadingGif = 'https://phoneky.co.uk/thumbs/screensavers/down/fantasy/ironman_ldhhscp2.gif';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const HASH = import.meta.env.VITE_HASH;

function CharacterDetailsPage() {
    const [character, setCharacter] = useState(null);
    const [comics, setComics] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const { characterId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const fromSeries = location.state?.fromSeries;

    /* BACK BUTTON CONST */
    const handleBack = () => {
        if (fromSeries) {
          navigate(`/series/${fromSeries}`);
        } else {
          navigate(-1);
        }
    }

    useEffect(() => {
        setLoading(true);

        // Fetch Character details
        axios
            .get(`${API_URL}/characters/${characterId}`, {
                params: { ts: 1, apikey: API_KEY, hash: HASH }
            })
            .then((response) => {
                setCharacter(response.data.data.results[0]);
            })
            .catch((error) => {
                console.error("Error fetching character data:", error);
            })
            .finally(() => {
                setLoading(false);
            });

        // Fetch Character comics
        axios
            .get(`${API_URL}/characters/${characterId}/comics`, {
                params: { ts: 1, apikey: API_KEY, hash: HASH }
            })
            .then((response) => {
                setComics(response.data.data.results);
            })
            .catch((error) => {
                console.error("Error fetching character comics:", error);
            });

        // Fetch character series
        axios
            .get(`${API_URL}/characters/${characterId}/series`, {
            params: { ts: 1, apikey: API_KEY, hash: HASH }
            })
            .then((response) => {
            setSeries(response.data.data.results);
            })
            .catch((error) => {
            console.error("Error fetching character series:", error);
            });
    }, [characterId]);
    
    if (loading) {
        return (
            <div className="loading-overlay">
                <img src={loadingGif} alt="Loading..." />
            </div>
        );
    }

    if (!character) {
        return (
        <div className="loading-overlay">
        <img src={loadingGif} alt="Loading..." />
        </div>
        );
    }

    return (
        <div>
        <div className="details-container">
            <div className="details-div">
                <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={`${character.name} Thumbnail`} />
                <h1>{character.name}</h1>
                <p>{character.description || "No description available."}</p>
            </div>
            <div className="comic-details-div">
                <h2>Comics</h2>
                {comics.length ? (
                    <ul>
                        {comics.map((comic) => (
                            <li className="character-comics-list" key={comic.id}>
                                <Link to={`/comics/${comic.id}`} state={{ fromCharacter: characterId }}>{comic.title}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-items">No comics available for {character.name}.</p>
                )}
            </div>
            <div className="series-details-div">
                <h2>Series</h2>
                {series.length ? (
                    <ul>
                        {series.map((serie) => (
                            <li key={serie.id}>
                                <Link to={`/series/${serie.id}`} state={{ fromCharacter: characterId }}>{serie.title}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-items">No series available for {character.name}.</p>
                )}
            </div>
             </div>  
             <div className="buttons">
                <button className='buttons-box' onClick={handleBack}>Back</button>  
             </div>  
             <div className='footer-div'><Footer/></div>
        </div>
    );
}

export default CharacterDetailsPage;
