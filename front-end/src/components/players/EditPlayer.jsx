import { useState, useEffect } from "react";
import { GAMES_URL, PLAYERS_URL } from "../../App.jsx";

const EditPlayer = ({ handleSection, storePlayerId }) => {
	const [player, setPlayer] = useState({name: "", favoriteGame: "", gamesPlayed: []}); // set state variable

	// load game data from database using stored ID
	useEffect(() => {
		const getPlayerData = async () => {
			// define function to call it
			try {
				const res = await fetch(`${PLAYERS_URL}/${storePlayerId}`);
				let JSONdata = await res.json();
				setPlayer(JSONdata);
			} catch (err) {
				console.log(err);
			}
		};
		getPlayerData(); // do dis
	}, []);

	// for conditional "update successful" message
	const [isComplete, setIsComplete] = useState(false);

	const handleInputChange = (event) => {
		// handleInputChange is called when you type in input box
		const { name, value } = event.target;
		// ... spread keeps the OG info from what was there before you edit
		// [name] will either be name, year, platform, or genre (value is what you're typing)
		setPlayer({ ...player, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault(); // Prevents page reload
		// Send put request to server to update game info. game._id is individual game info to be edited
		await fetch(`${PLAYERS_URL}/${storePlayerId}`, {
			method: "PUT",
			headers: {
				// This means that the type of info being requested from server is JSON
				"Content-Type": "application/json",
			},
			// stringify is what it sounds like, turns JSON data from input into a string. Pretty cute
			body: JSON.stringify(player),
		});
		// for conditional success message
		setIsComplete(true);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Username:</label>
					<input
						type="text"
						name="name"
						value={player.name}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="favoriteGame">Favorite Game:</label>
					<input
						type="text"
						name="favoriteGame"
						value={player.favoriteGame}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="gamesPlayed">Games Played:</label>
					<input
						type="text"
						name="gamesPlayed"
						value={player.gamesPlayed}
						onChange={handleInputChange}
					/>
				</div>
				{isComplete ? <p>Player updated successfully!</p> : ""}
				<div>
					{/* "save" submits, "back" returns to show */}
					<button type="submit">Save</button>
					<button onClick={handleSection} value="ShowPlayer">
						Back to Player
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditPlayer;
