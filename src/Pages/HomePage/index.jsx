import React from 'react'

function HomePage() {
  return (
    <div>
        <h1>MARVEL WORLD</h1>
        <img src='public/marvel-logo.svg' alt='marvel logo' id='logo'></img>

       <div className='main-square-div'>     
            <div className='square-div'>
                <h2>CHARACTERS</h2>
            </div>

            <div className='square-div-2'>
                <h2>COMICS</h2>
            </div>

            <div className='square-div-3'>
                <h2>SERIES</h2>   
            </div>

        </div>

       
            
        
    </div>
  )
}

export default HomePage