import React from 'react';
import backgroundVideo from "../../assets/backgroundVideo.mp4";

function HomePage () {
    return (
      <div className='homepage-video'>
        <video src={backgroundVideo} autoPlay loop muted/>
        <div className="content">
            <p>Welcome to Marvel World</p>
        </div>
      </div>
    );
  }
  
  export default HomePage;
  