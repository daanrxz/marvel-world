import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from "../../assets/backgroundVideo.mp4";

function HomePage () {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
    };

    return (
      <div className='homepage-video'>
        <video ref={videoRef} src={backgroundVideo} autoPlay loop muted={isMuted} />
        <div className="content">
            <p>Marvel Universe</p>
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
            <div className='mute-button-container'>
            <button className="mute-button" onClick={toggleMute}>
                    {isMuted ? 'Unmute' : 'Mute'}
                </button>
            </div>
        </div>
      </div>
    );
}
  
export default HomePage;
