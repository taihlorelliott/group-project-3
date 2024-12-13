// creat/add new game

//imports
import { useState } from "react";
import { GAMES_URL } from "../../App";

//set up use state
const NewGame = ({ handleSection }) => {
	const [game, setGame] = useState({
		name: "",
		year: "",
		platform: "",
		genre: "",
	});

	const [formSubmitted, setFormSubmitted] = useState(false);
	const [submittedGame, setSubmittedGame] = useState();

	// handle change from input
	const handleInputChange = (event) => {
		//this takes the current items in the game object and keeps them.  then adds only what is targeted by the value that input and update it.
		setGame({ ...game, [event.target.name]: event.target.value });
	};

	//submit form data
	const handleSubmit = async (event) => {
		event.preventDefault();
		await fetch(GAMES_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(game),
		});

		setSubmittedGame(game.name);

		setGame({
			name: "",
			year: "",
			platform: "",
			genre: "",
		});

		setFormSubmitted(true);
	};

	return (
		<div>
			<h2>Add Game</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Name: </label>
					<input
						type="text"
						name="name"
						value={game.name}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label>Year Published: </label>
					<input
						type="text"
						name="year"
						value={game.year}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label>Platform: </label>
					<input
						type="text"
						name="platform"
						value={game.platform}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label>Genre: </label>
					<input
						type="text"
						name="genre"
						value={game.genre}
						onChange={handleInputChange}
						required
					/>
				</div>
				{formSubmitted ? <p>{submittedGame} submitted successfully!</p> : "" }
				<div>
					<button type="submit">Submit Game</button>
					<button onClick={handleSection} value="GameIndex">
						Back to Games
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewGame;
