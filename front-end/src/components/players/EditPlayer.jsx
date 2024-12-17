import { useState, useEffect } from "react";
import { GAMES_URL, PLAYERS_URL } from "../../App.jsx";

const EditPlayer = ({ handleSection, storedPlayerId }) => {
	const [player, setPlayer] = useState({name: "", favoriteGame: "", gamesPlayed: []}); // set state variable
	
	// All games in database
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        const getGamesIndex = async () => {
            const res = await fetch(GAMES_URL);
            let JSONdata = await res.json();
            setGameList(JSONdata);
        };
        getGamesIndex();
    }, []);

	// load game data from database using stored ID
	useEffect(() => {
		const getPlayerData = async () => {
			// define function to call it
			try {
				const res = await fetch(`${PLAYERS_URL}/${storedPlayerId}`);
				let JSONdata = await res.json();
				setPlayer(JSONdata);
                setGamesPlayedHolder(JSONdata.gamesPlayed)
			} catch (err) {
				console.log(err);
			}
		};
		getPlayerData(); // do dis
	}, [storedPlayerId]);

	// // for conditional "update successful" message
	// const [isComplete, setIsComplete] = useState(false);

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
		setPlayer({...player, gamesPlayed: gamesPlayedHolder})
        // fetch request for updating player in database
		await fetch(`${PLAYERS_URL}/${storedPlayerId}`, {
			method: "PUT",
			headers: {
				// This means that the type of info being requested from server is JSON
				"Content-Type": "application/json",
			},
			// stringify is what it sounds like, turns JSON data from input into a string. Pretty cute
			body: JSON.stringify(player),
		});
		// // for conditional success message
		// setIsComplete(true);
	};

    const handleDelete = async (event) => {
		await fetch(`${PLAYERS_URL}/${storedPlayerId}`, {
			method: "DELETE",
		});
        handleSection(event)
	};

    // Games to be added to gamesPlayed list
	const [gamesPlayedHolder, setGamesPlayedHolder] = useState([]);
	const [holderGame, setHolderGame] = useState();

	const handleGameHolderChange = (event) => {
		setHolderGame(event.target.value);
	}

	const addToHolder = () => {
        if (holderGame) {
            setGamesPlayedHolder([...gamesPlayedHolder, holderGame]);
        }
	}

	const removeFromHolder = (index) => {
		const filteredArray = gamesPlayedHolder.filter((_, i) => i !== index)
		setGamesPlayedHolder(filteredArray)
	}

    const FavoriteDropdown = ({ gameList }) => {
        return (
            <select
                name="favoriteGame"
                value={player.favoriteGame}
                onChange={handleInputChange}
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

    const PlayedDropdown = ({ gameList }) => {
        return (
            <>
                <select
                    name="holderGame"
                    value={holderGame}
                    onChange={handleGameHolderChange}
                    className="form-control bg-info bg-opacity-25 text-light w-50"
                >
                    <option value="" className="bg-dark">
                        Select a game...
                    </option>
                    {gameList.map((game, index) => (
                        <option key={index} value={game.name} className="bg-dark">
                            {game.name}
                        </option>
                    ))}
                </select>
            </>
        );
    };

	return (
		<div className="bg-dark">
            <h2 className="text-danger ms-2">Edit Player</h2>
			<form onSubmit={handleSubmit} className="ms-2">
				<div className="mb-3">
					<label htmlFor="name" className="text-light form-label ms-1">Username:</label>
					<input
						type="text"
						name="name"
						value={player.name}
						onChange={handleInputChange}
                        className="form-control bg-info bg-opacity-25 text-light w-50"
					/>
				</div>
				<div className="mb-3">
                    <label htmlFor="favoriteGame" className="text-light form-label ms-1">Favorite Game: </label>
                    <FavoriteDropdown gameList={gameList} />
				</div>
				<div className="mb-3">
					<label htmlFor="gamesPlayed" className="text-light form-label ms-1">Add to Games Played:</label>
					<PlayedDropdown gameList={gameList} />
                    <button onClick={addToHolder} className="btn btn-danger btn-sm mt-2 ms-1">Add Game</button>
				</div>
				<div className="mb-3">
                <label className="text-light form-label ms-1">Games Played:</label>
                    <ul className="list-unstyled d-flex flex-wrap">
                        {gamesPlayedHolder.map((game, index) => (
                            <li key={index} className="badge bg-info rounded-pill bg-opacity-50 ps-3 pe-2 me-2 mb-3">
                                {game}
                                <button onClick={() => removeFromHolder(index)} className="btn btn-sm btn-danger ms-2 rounded-pill">
                                X
                                </button>
                            </li>
                        ))}
                    </ul>
				</div>
				
                {/* conditional success message ternary
				{isComplete === true ? <p>Player updated successfully!</p> : ""} */}

				<div>
					{/* "save" submits, "back" returns to show */}
					<button className="btn btn-danger me-2 ms-2" type="submit">Save</button>
                    <button className="btn btn-danger me-2 btn ms-2" value="PlayerIndex" onClick={() => {handleDelete(event)}}>Delete</button>
					<button className="btn btn-danger me-2 ms-2" onClick={handleSection} value="ShowPlayer">
						Back to Player
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditPlayer;

