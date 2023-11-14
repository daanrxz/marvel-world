import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = "https://gateway.marvel.com/v1/public";
const API_KEY = "fd986a65b294a48abcc1a51232b02444";
const HASH = "55660d0ce5a27d43b54fdac1c38ba2e3";

function ComicDetailsPage() {
    const [comic, setComic] = useState(null);
    const [characters, setCharacters] = useState([]);
    const { comicId } = useParams();
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
        axios.get(`${API_URL}/comics/${comicId}`, {
            params: { ts: 1, apikey: API_KEY, hash: HASH }
        })

        .then((response)=>{
            setComic(response.data.data.results[0]);
        })

        .catch((error)=> {
            console.error("Error fetching comic data:", error)
        });

        //Fetch comic character

        axios.get(`${API_URL}/comics/${comicId}/characters`, {
                params: { ts: 1, apikey: API_KEY, hash: HASH }
             })
             .then((response) => {
                setCharacters(response.data.data.results);
            })
            .catch((error) => {
                console.error("Error fetching comics character:", error);
            });
    }, [comicId]);

    if (!comic) {
        return <p>Loading comic details...</p>;
    }

    return (
        <div>
        <div className="details-container">
            <div className="details-div">
                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={`${comic.name} Thumbnail`} />
                <h1>{comic.name}</h1>
                <p>Page Count:{comic.pageCount || "No page count available"}</p>
                <p>{comic.description || "No description available."}</p>
            </div>
            <div className="series-details-div">
                <h2>Characters</h2>
                {characters.length ? (
                    <ul>
                        {characters.map((character) => (
                            <li key={character.id}>
                                <Link to={`/characters/${character.id}`}>{character.name}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-items">No characters available for this comic.</p>
                )}
            </div>   
        </div>
        <div className="buttons">
            <button className='buttons-box' onClick={handleBack}>Back</button>  
        </div>
        </div>
    )


}

export default ComicDetailsPage;
     
