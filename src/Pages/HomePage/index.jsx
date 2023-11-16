import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from "../../assets/backgroundVideo.mp4";

function HomePage () {

    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);
        /* MUTE OPTION */
    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
    };

    return (
        /* BACKGROUND VIDEO */
      <div className='homepage-video'>
        <video ref={videoRef} src={backgroundVideo} autoPlay loop muted={isMuted} />
        <div className="content">
            <p>Marvel Universe</p>
        </div>

        {/* HOMEPAGE BUTTONS LINKING TO EACH PAGE */}

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

            {/* MUTE BUTTON */}

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
