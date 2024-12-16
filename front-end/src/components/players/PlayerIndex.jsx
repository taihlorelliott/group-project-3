import { PLAYERS_URL } from "../../App.jsx";
import { useState, useEffect } from 'react';

const PlayerIndex = ({ handleSection, setStoredPlayerId }) => {
    const [players, setPlayers] = useState([]); // Set state variable

    useEffect(() => {
        const getPlayerIndex = async () => { // Define function to call it
            try {
                const res = await fetch(PLAYERS_URL);
                let JSONdata = await res.json();
                setPlayers(JSONdata);
            } catch (err) {
                console.log(err);
            }
        };
        getPlayerIndex(); // Fetch players
    }, []);

    // Handles setting stored player ID and navigating to the correct section
    const sectionAndStore = (id, section) => {
        setStoredPlayerId(id);
        handleSection(section);
    };

    return (
        <div>
            <h2>Player Index</h2>
            <button onClick={handleSection} value="NewPlayer">Add New Player</button>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>
                        {player.name}
                        {/* Correctly pass section name as a parameter */}
                        <button onClick={() => sectionAndStore(player._id, "ShowPlayer")}>
                            More Info
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerIndex;
