import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../Footer';

const loadingGif = 'https://phoneky.co.uk/thumbs/screensavers/down/fantasy/ironman_ldhhscp2.gif';

const API_URL = "https://gateway.marvel.com/v1/public";
const API_KEY = "fd986a65b294a48abcc1a51232b02444";
const HASH = "55660d0ce5a27d43b54fdac1c38ba2e3";

function SerieDetailsPage() {
    const [serie, setSerie] = useState(null); 
    const [comics, setComics] = useState ([]);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const { serieId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const fromCharacter = location.state?.fromCharacter;

const handleBack = () => {
  if (fromCharacter) {
    navigate(`/characters/${fromCharacter}`);
  } else {
    navigate('/series');}
  }
    
    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/series/${serieId}`, {
            params: { ts: 1, apikey: API_KEY, hash: HASH }
        })
        .then((response) => {
            
            const oneSerie = response.seriesData.data.results[0];
            setSerie(oneSerie); 
        })
        .catch((error) => {
            console.error("Error fetching serie data:", error);
        })
        .finally(() => {
            setLoading(false); 
        });


    // Fetch serie characters

        axios
            .get(`${API_URL}/series/${serieId}/characters`, {
                params: { ts: 1, apikey: API_KEY, hash: HASH }
            })
            .then((response) => {
                setCharacters(response.charsData.data.results);
            })
            .catch((error) => {
                console.error("Error fetching serie characters", error);
            });
        
        // fetch serie comics
        axios
            .get(`${API_URL}/series/${serieId}/comics`, {
            params: { ts: 1, apikey: API_KEY, hash: HASH }
            })
            .then((response) => {
            setComics(response.comicsData.data.results);
            })
            .catch((error) => {
            console.error("Error fetching serie comics", error);
            });
            
    }, [serieId]); 
    
    if (!serie) {
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
                <img src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`} alt={`${serie.title} Thumbnail`} />
                <h1>{serie.title}</h1>
                <p>{serie.description || "No description available."}</p>
            </div>
            

            <div className="comic-details-div">
                <h2>Comics</h2>
                {comics.length ? (
                    <ul>
                        {comics.map((comic) => (
                            <li className="character-comics-list" key={comic.id}>
                                <Link to={`/comics/${comic.id}`} state={{ fromSeries: serieId }}>{comic.title}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-items">No comics available for {serie.title}.</p>
                )}
            </div>
            <div className="series-details-div">
                <h2>Characters</h2>
                {characters.length ? (
                    <ul>
                        {characters.map((character) => (
                            <li key={character.id}>
                                <Link to={`/characters/${character.id}`} state={{ fromSeries: serieId }}>{character.name}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-items">No characters available for {serie.title}.</p>
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

export default SerieDetailsPage;
