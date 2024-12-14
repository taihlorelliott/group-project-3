import {useState} from 'react';
import NewPlayer from './NewPlayer';
import PlayerIndex from './PlayerIndex.jsx'
import ShowPlayer from './ShowPlayer.jsx';
import EditPlayer from './EditPlayer.jsx';


const PlayerSection = () => {
    const [currentPage, setCurrentPage] = useState("PlayerIndex");

    // stores a selected players' ID to use as props for show/edit
    const [storedPlayerId, setStoredPlayerId] = useState();

    const handleSection = (event) => {
        setCurrentPage(event.target.value)
    };

    return (
        <>
         {currentPage === "PlayerIndex" ? <PlayerIndex handleSection={handleSection}/> : ""}
         {currentPage === "NewPlayer" ? <NewPlayer handleSection={handleSection}/> : ""}
         {currentPage === "ShowPlayer" ? <ShowPlayer handleSection={handleSection} storedPlayerId={storedPlayerId}/> : ""}
         {currentPage === "EditPlayer" ? <EditPlayer handleSection={handleSection} storedPlayerId={storedPlayerId} setStoredPlayerId={setStoredPlayerId}/> : ""}
        </>
    );
};

export default PlayerSection;