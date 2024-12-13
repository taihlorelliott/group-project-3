import { useState, useEffect } from "react";
import { GAMES_URL } from "../../App.jsx";

const EditGame = ({ handleSection, storedGameId }) => {
	const [game, setGame] = useState({name: "", year: "", platform: "", genre: ""}); // set state variable

	// load game data from database using stored ID
	useEffect(() => {
		const getGameData = async () => {
			// define function to call it
			try {
				const res = await fetch(`${GAMES_URL}/${storedGameId}`);
				let JSONdata = await res.json();
				setGame(JSONdata);
			} catch (err) {
				console.log(err);
			}
		};
		getGameData(); // do dis
	}, []);

	// for conditional "update successful" message
	const [isComplete, setIsComplete] = useState(false);

	const handleInputChange = (event) => {
		// handleInputChange is called when you type in input box
		const { name, value } = event.target;
		// ... spread keeps the OG info from what was there before you edit
		// [name] will either be name, year, platform, or genre (value is what you're typing)
		setGame({ ...game, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault(); // Prevents page reload
		// Send put request to server to update game info. game._id is individual game info to be edited
		await fetch(`${GAMES_URL}/${storedGameId}`, {
			method: "PUT",
			headers: {
				// This means that the type of info being requested from server is JSON
				"Content-Type": "application/json",
			},
			// stringify is what it sounds like, turns JSON data from input into a string. Pretty cute
			body: JSON.stringify(game),
		});
		// for conditional success message
		setIsComplete(true);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						name="name"
						value={game.name}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="year">Year:</label>
					<input
						type="text"
						name="year"
						value={game.year}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="platform">Platform:</label>
					<input
						type="text"
						name="platform"
						value={game.platform}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="genre">Genre:</label>
					<input
						type="text"
						name="genre"
						value={game.genre}
						onChange={handleInputChange}
					/>
				</div>
				{isComplete ? <p>Game updated successfully!</p> : ""}
				<div>
					{/* "save" submits, "back" returns to show */}
					<button type="submit">Save</button>
					<button onClick={handleSection} value="ShowGame">
						Back to Game
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditGame;
