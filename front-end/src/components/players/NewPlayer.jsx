import { useState, useEffect } from "react";
import { GAMES_URL, PLAYERS_URL } from "../../App";

const NewPlayer = ({ handleSection }) => {
    const [player, setPlayer] = useState({
        name: "",
        favoriteGame: "",
        gamesPlayed: [],
    });

    const [submissionSuccess, setSubmissionSuccess] = useState(false); 
    const [gameList, setGameList] = useState([]);

    const handleChange = (event) => {
        setPlayer({ ...player, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const response = await fetch(PLAYERS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(player),
        });

        if (response.ok) {
            setSubmissionSuccess(true); 
            setPlayer({
                name: "",
                favoriteGame: "",
                gamesPlayed: [],
            });
        } else {
            console.error("Failed to submit the player");
        }
    };

    useEffect(() => {
        const getGamesIndex = async () => {
            const res = await fetch(GAMES_URL);
            let JSONdata = await res.json();
            setGameList(JSONdata);

        };
        getGamesIndex();
    }, []);

    const Dropdown = ({ gameList }) => {
        return (
            <select
                name="favoriteGame"
                value={player.favoriteGame}
                onChange={handleChange}
                className="form-control bg-info bg-opacity-25 text-light w-50"
            >
                <option disabled value="" className="bg-dark">
                    Select Favorite...
                </option>
                {gameList.map((game, index) => (
                    <option key={index} value={game.name} className="bg-dark">
                        {game.name}
                    </option>
                ))}
            </select>
        );
    };

    return (
        <div className="bg-dark">
            <h2 className="text-danger ms-2">Add Player</h2>
            <form onSubmit={handleSubmit} className="ms-2">
                <div className="mb-3">
                    <label htmlFor="name" className="text-light form-label ms-1">Username: </label>
                    <input
                        id="name"
                        name="name"
                        value={player.name}
                        onChange={handleChange}
                        required
                        className="form-control bg-info bg-opacity-25 text-light w-50"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="favoriteGame" className="text-light form-label ms-1">Favorite Game: </label>
                    <Dropdown gameList={gameList} />
                </div>
                <div className="mb-3">
                   <button type="submit" className="btn btn-danger me-2 ms-2">Submit Player</button>
                    {/* Success message */}
                    {submissionSuccess && <p>Player submitted successfully!</p>}
                    <button value="PlayerIndex" onClick={handleSection} className="btn btn-danger me-2 ms-2">
                        Back to Players
                    </button> 
                </div>
                
            </form>
        </div>
    );
};

export default NewPlayer;
