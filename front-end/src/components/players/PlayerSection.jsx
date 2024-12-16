import {useState} from 'react';
import NewPlayer from './NewPlayer';
import PlayerIndex from './PlayerIndex'
import ShowPlayer from './ShowPlayer';
import EditPlayer from './EditPlayer';


const PlayerSection = () => {
    const [currentPage, setCurrentPage] = useState("PlayerIndex");

    // stores a selected players' ID to use as props for show/edit
    const [storedPlayerId, setStoredPlayerId] = useState();

    const handleSection = (event) => {
        setCurrentPage(event.target.value)
    };

    return (
        <>
            {/* ternary + props for Player Index page */}
            {currentPage === "PlayerIndex" ? <PlayerIndex handleSection={handleSection} setStoredPlayerId={setStoredPlayerId}/> : ""}

            {/* ternary + props for New Player form */}
            {currentPage === "NewPlayer" ? <NewPlayer handleSection={handleSection}/> : ""}

            {/* ternary + props for Show Player page */}
            {currentPage === "ShowPlayer" ? <ShowPlayer handleSection={handleSection} storedPlayerId={storedPlayerId}/> : ""}

            {/* ternary + props for Edit Player form */}
            {currentPage === "EditPlayer" ? <EditPlayer handleSection={handleSection} storedPlayerId={storedPlayerId} setStoredPlayerId={setStoredPlayerId} /> : ""}
        </>
    );
};

export default PlayerSection;