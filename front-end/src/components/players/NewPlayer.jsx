
// imports
import { useState } from "react";
import { PLAYERS_URL } from "../../App";

//set up use state
const NewPlayer = () => {
    const [player, setPlayer] = useState({
        name: "",
        favoriteGame: "",
        gamesPlayed: "",
    });

    // handler function to update newPlayer form
    const handleChange = (event) => {
        setPlayer({ ...player, [event.target.name]: event.target.value }); // update form data with values input by user
    };

    // submitting form data
    const handleSubmit = async (event) => {
        event.preventDefault(); // preventing default behavior of submit button
        const response = await fetch(PLAYERS_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(player),
		});

        setPlayer({
            name: "",
            favoriteGame: "",
            gamesPlayed: "",
        });
    };

    return (
        <>
            {/* <h2>{player}</h2> */}
            <h2>Add Player</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input
                    id="name"
                    name="name"
                    value={player.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="favoriteGame">Favorite Game: </label>
                <input
                    id="favoriteGame"
                    name="favoriteGame"
                    value={player.favoriteGame}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="gamesPlayed">Games Played: </label>
                <input
                    id="gamesPlayed"
                    name="gamesPlayed"
                    value={player.gamesPlayed}
                    onChange={handleChange}
                    required
                />
                <button type="submit" value="Add Player"> Submit Player </button>
            </form>
        </>
    );
 };

 export default NewPlayer;