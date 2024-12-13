import {useState} from 'react';
import NewPlayer from './NewPlayer';
import PlayerIndex from './PlayerIndex.jsx'


const PlayerSection = () => {
    const [currentPage, setCurrentPage] = useState("PlayerIndex");

    const handleSection = (event) => {
        setCurrentPage(event.target.value)
    };

    return (
        <>
         {currentPage === "PlayerIndex" ? <PlayerIndex handleSection={handleSection}/> : ""}
         {currentPage === "NewPlayer" ? <NewPlayer handleSection={handleSection}/> : ""}
        </>
    );
};

export default PlayerSection;
