import { useState, useEffect } from "react";
import { GAMES_URL } from "../../App.jsx";

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../index.css';


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

    const handleDelete = async (event) => {
		await fetch(`${GAMES_URL}/${storedGameId}`, {
			method: "DELETE",
		});
        handleSection(event)
	};

	return (
		<div className="bg-dark">
			<h2 className="text-danger ms-2">Edit Game</h2>
			<form onSubmit={handleSubmit} className="ms-2">
				<div className="mb-3">
					<label htmlFor="name" className="text-light form-label ms-1">Name:</label>
					<input
						type="text"
						name="name"
						value={game.name}
						onChange={handleInputChange}
                        className="form-control bg-info bg-opacity-25 text-light w-50"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="year" className="text-light form-label ms-1">Year:</label>
					<input
						type="text"
						name="year"
						value={game.year}
						onChange={handleInputChange}
                        className="form-control bg-info bg-opacity-25 text-light w-50"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="platform" className="text-light form-label ms-1">Platform:</label>
					<input
						type="text"
						name="platform"
						value={game.platform}
						onChange={handleInputChange}
                        className="form-control bg-info bg-opacity-25 text-light w-50"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="genre" className="text-light form-label ms-1">Genre:</label>
					<input
						type="text"
						name="genre"
						value={game.genre}
						onChange={handleInputChange}
                        className="form-control bg-info bg-opacity-25 text-light w-50"
					/>
				</div>
				{isComplete ? <p className="text-light ms-2">Game updated successfully!</p> : ""}
				<div>
					{/* "save" submits, "back" returns to show */}
					<button className="btn btn-danger me-2 btn ms-2" type="submit">Save</button>
                    <button className="btn btn-danger me-2 btn ms-2" value="GameIndex" onClick={() => {handleDelete(event)}}>Delete</button>
					<button className="btn btn-danger me-2 btn ms-2" onClick={handleSection} value="ShowGame">
						Back to Game
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditGame;
