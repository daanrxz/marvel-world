import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const loadingGif = 'https://pa1.aminoapps.com/7189/d9db06c9e17513208042210fe00e8341f180315cr1-640-480_hq.gif';

const API_URL = "https://gateway.marvel.com/v1/public";
const API_KEY = "fd986a65b294a48abcc1a51232b02444";
const HASH = "55660d0ce5a27d43b54fdac1c38ba2e3";

function CharacterDetailsPage() {
    const [character, setCharacter] = useState(null);
    const [comics, setComics] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const { characterId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const fromSeries = location.state?.fromSeries;

    const handleBack = () => {
        if (fromSeries) {
          navigate(`/series/${fromSeries}`);
        } else {
          navigate(-1);
        }
    }

    useEffect(() => {
        setLoading(true); // Set loading to true when starting a new fetch

        // Fetch character details
        axios.get(`${API_URL}/characters/${characterId}`, {
            params: { ts: 1, apikey: API_KEY, hash: HASH }
        })
        .then((response) => {
            setCharacter(response.data.data.results[0]);
        })
        .catch((error) => {
            console.error("Error fetching character data:", error);
        })
        .finally(() => {
            setLoading(false); // Set loading to false after the fetch completes
        });

        // Fetch character comics
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
    }, [characterId]); //only when characterId changes
    
    if (loading) {
        return (
            <div className="loading-overlay">
                <img src={loadingGif} alt="Loading..." />
            </div>
        );
    }

    if (!character) {
        return <p>Loading character details...</p>;
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
                    <p>No comics available for this character.</p>
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
                    <p>No series available for this character.</p>
                )}
            </div>
             </div>  
             <div className="buttons">
                <button className='buttons-box' onClick={handleBack}>Back</button>  
             </div>   
        </div>
    );
}

export default CharacterDetailsPage;
