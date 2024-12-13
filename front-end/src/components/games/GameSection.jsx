import {useState} from 'react';
import NewGame from './NewGame';
import GameIndex from './GameIndex';
import ShowGame from './ShowGame';
import EditGame from './EditGame';


const GameSection = () => {
    // sets which component is displayed under game nav section
    const [currentPage, setCurrentPage] = useState("GameIndex")

    // stores a selected game's id to use as props for show/edit
    const [storedGameId, setStoredGameId] = useState()

    const handleSection = (event) => {
        setCurrentPage(event.target.value)
    };

    return (
        <>
            {/* ternary + props for Game Index page */}
            {currentPage === "GameIndex" ? <GameIndex handleSection={handleSection} setStoredGameId={setStoredGameId}/> : ""}

            {/* ternary + props for New Game form */}
            {currentPage === "NewGame" ? <NewGame handleSection={handleSection}/> : ""}

            {/* ternary + props for Show Game page */}
            {currentPage === "ShowGame" ? <ShowGame handleSection={handleSection} storedGameId={storedGameId}/> : ""}

            {/* ternary + props for Edit Game form */}
            {currentPage === "EditGame" ? <EditGame handleSection={handleSection} storedGameId={storedGameId} setStoredGameId={setStoredGameId}/> : ""}
        </>
    )
}

export default GameSection

