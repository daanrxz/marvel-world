import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './Pages/HomePage';
import './App.css';
import CharactersListPage from './Pages/CharactersList';
import NavBar from './Pages/NavBar';
import CharacterDetailsPage from './Pages/CharacterDetailsPage';
import ComicsListPage from './Pages/ComicsList';
import ComicDetailsPage from './Pages/ComicDetailsPage';
import SeriesListPage from './Pages/SeriesList';
import SerieDetailsPage from './Pages/SerieDetailsPage';
import Footer from './Pages/Footer';
import SuggestionPage from './Pages/SuggestionsPage';

function App() {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const handleSearchChange = (searchValue) => {
    // Handle the search change logic here
    console.log('Search value in App component:', searchValue);
    // You can update some state or perform other actions based on the search value
  };

  useEffect(() => {
    // Hide the navbar on the HomePage
    setShowNavBar(location.pathname !== "/");
    setShowFooter(location.pathname !== "/");
  }, [location.pathname]);

  return (
    <div className='App'>
      {showNavBar && <NavBar onSearchChange={handleSearchChange} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersListPage />} />
        <Route path='/characters/:characterId' element={<CharacterDetailsPage />} />
        <Route path='/comics' element={<ComicsListPage />} />
        <Route path='/comics/:comicId' element={<ComicDetailsPage />} />
        <Route path='/series' element={<SeriesListPage />} />
        <Route path='/series/:serieId' element={<SerieDetailsPage />} />
        <Route path='/suggestions' element={<SuggestionPage />} />
      </Routes>
      {/* {showFooter && location.pathname !== "/" && <Footer />} */}
    </div>
  );
}

export default App;
