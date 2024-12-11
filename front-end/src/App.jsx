// src/app.jsx
// imports
import { useState } from 'react'
import Navbar from '.components/Navbar/Navbar.jsx';
import Home from './components/Home.jsx';
import Games from './components/games/GameIndex.jsx';
import Players from './components/players/PlayerIndex.jsx';

function App() {
 
  const [currentPage, setCurrentPage] = useState('Home');

  const handleSection = (event) => {
    setCurrentPage(event.target.value)
  }

  return (
    <>
      <Navbar handleSection={handleSection} className="display"/>
      <div className="nav">
        {currentPage === 'Home' ? <Home/> : ""}
        {currentPage === 'Games' ? <Games/> : ""}
        {currentPage === 'Players' ? <Players/> : ""}
      </div>
    </>
  );
};

export default App;
