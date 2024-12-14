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
    const [favorite, setFavorite] = useState();

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
            >
                <option disabled value="">
                    Select Favorite...
                </option>
                {gameList.map((game, index) => (
                    <option key={index} value={game._id}>
                        {game.name}
                    </option>
                ))}
            </select>
        );
    };

    return (
        <>
            <h2>Add Player</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Username: </label>
                <input
                    id="name"
                    name="name"
                    value={player.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="favoriteGame">Favorite Game: </label>
                <Dropdown gameList={gameList} />
                <button type="submit">Submit Player</button>
                {/* Success message */}
                {submissionSuccess && <p>Player submitted successfully!</p>}
                <button value="PlayerIndex" onClick={handleSection}>
                    Back to Players
                </button>
            </form>
        </>
    );
};

export default NewPlayer;
