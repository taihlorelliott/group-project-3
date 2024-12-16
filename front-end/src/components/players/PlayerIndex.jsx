import { PLAYERS_URL } from "../../App.jsx";
import { useState, useEffect } from 'react';
import '../../index.css';

// bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'

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
    const sectionAndStore = (id, event) => {
        setStoredPlayerId(id);
        handleSection(event);
    };

    return (
        <div className="bg-dark">
            <h2 className="text-danger ms-2">Player Index</h2>
            <button className="btn btn-info me-2 btn-sm ms-2" onClick={handleSection} value="NewPlayer">Add New Player</button>
            <ul className="d-flex flex-wrap">
                {players.map((player, index) => (
                    <li className="d-grid col-3 mt-3 me-3 text-light text-center list-unstyled border border-info rounded px-3 py-3 w-auto" key={index}>
                        {player.name}
                        {/* Correctly pass section name as a parameter */}
                        <button className="btn btn-outline-danger me-2 btn-sm ms-2 mt-2" onClick={() => sectionAndStore(player._id, event)} value="ShowPlayer">
                            More Info
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerIndex;
