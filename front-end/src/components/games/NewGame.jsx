// creat/add new game

//imports
import { useState } from "react";
import { GAMES_URL } from "../../App";

//set up use state
const NewGame = () => {
	const [game, setGame] = useState({
		name: "",
		year: "",
		platform: "",
		genre: "",
	});

	// handle change from input
	const handleInputChange = (event) => {
		//this takes the current items in the game object and keeps them.  then adds only what is targeted by the value that input and update it.
		setGame({ ...game, [event.target.name]: event.target.value });
	};

	//submit form data
	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch(GAMES_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(game),
		});

		setGame({
			name: "",
			year: "",
			platform: "",
			genre: "",
		});

		

	};

	return (
		<div>
			<h2>Add Game</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={game.name}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label>Year Published:</label>
					<input
						type="text"
						name="year"
						value={game.year}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label>Platform:</label>
					<input
						type="text"
						name="platform"
						value={game.platform}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label>Genre:</label>
					<input
						type="text"
						name="genre"
						value={game.genre}
						onChange={handleInputChange}
						required
					/>
				</div>
				<input type="submit" value="Add Game" />
			</form>
		</div>
	);
};

export default NewGame;
