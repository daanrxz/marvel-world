import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from "../../assets/backgroundVideo.mp4";

function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('public/Marvel Opening Theme.mp3')); // Replace with your audio file path

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='homepage-video'>
      <video src={backgroundVideo} autoPlay loop muted/>
      <div className="content">
          <p>Marvel Universe</p>
          <button onClick={togglePlay} className='homepage-buttons'>
            {isPlaying ? 'Mute' : 'Play'} Music
          </button>
      </div>
      <div className='homepage-links'>
          <div>
            <Link to={"/characters"}>
              <button className='homepage-buttons'>Characters</button>
            </Link>
            <Link to="/comics">
              <button className='homepage-buttons'>Comics</button>
            </Link>
            <Link to="/series">
              <button className='homepage-buttons'>Series</button>
            </Link>
          </div>
      </div>
    </div>
  );
}

export default HomePage;
