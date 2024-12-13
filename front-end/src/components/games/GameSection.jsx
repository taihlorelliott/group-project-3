import {useState} from 'react';
import NewGame from './NewGame';
import GameIndex from './GameIndex';


const GameSection = () => {
    const [currentPage, setCurrentPage] = useState("GameIndex")

    const handleSection = (event) => {
        setCurrentPage(event.target.value)
    };

    return (
        <>
         {currentPage === "GameIndex" ? <GameIndex handleSection={handleSection}/> : ""}
         {currentPage === "NewGame" ? <NewGame handleSection={handleSection}/> : ""}
        </>
    )
}

export default GameSection

