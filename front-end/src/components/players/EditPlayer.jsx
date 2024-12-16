import { useState, useEffect } from "react";
import { GAMES_URL, PLAYERS_URL } from "../../App.jsx";

const EditPlayer = ({ handleSection, storedPlayerId }) => {
	const [player, setPlayer] = useState({name: "", favoriteGame: "", gamesPlayed: []}); // set state variable
	
	// All games in database
    const [gameList, setGameList] = useState([]);

	// Games to be added to gamesPlayed list
	const [gamesPlayedHolder, setGamesPlayedHolder] = useState([]);
	const [holderGame, setHolderGame] = useState();

	// load game data from database using stored ID
	useEffect(() => {
		const getPlayerData = async () => {
			// define function to call it
			try {
				const res = await fetch(`${PLAYERS_URL}/${storedPlayerId}`);
				let JSONdata = await res.json();
				setPlayer(JSONdata);
			} catch (err) {
				console.log(err);
			}
		};
		getPlayerData(); // do dis
		// setGamesPlayedHolder(player.gamesPlayed);
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
		setPlayer({...player, gamesPlayed: gamesPlayedHolder})
		await fetch(`${PLAYERS_URL}/${storedPlayerId}`, {
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

	const handleGameHolderChange = (event) => {
		setHolderGame(event.target.value);
	}

	const addToHolder = () => {
		setGamesPlayedHolder([...gamesPlayedHolder, holderGame]);
	}

	const removeFromHolder = (index) => {
		const filteredArray = gamesPlayedHolder.filter((_, i) => i !== index)
		setGamesPlayedHolder(filteredArray)
	}

	useEffect(() => {
        const getGamesIndex = async () => {
            const res = await fetch(GAMES_URL);
            let JSONdata = await res.json();
            setGameList(JSONdata);
        };
        getGamesIndex();
    }, []);

    const FavoriteDropdown = ({ gameList }) => {
        return (
            <select
                name="favoriteGame"
                value={player.favoriteGame}
                onChange={handleInputChange}
            >
                <option disabled value="">
                    Select Favorite...
                </option>
                {gameList.map((game, index) => (
                    <option key={index} value={game.name}>
                        {game.name}
                    </option>
                ))}
            </select>
        );
    };

    const PlayedDropdown = ({ gameList }) => {
        return (
            <select
                name="holderGame"
                value={holderGame}
                onChange={handleGameHolderChange}
            >
                <option disabled value="">
                    Select a game...
                </option>
                {gameList.map((game, index) => (
                    <option key={index} value={game.name}>
                        {game.name}
                    </option>
                ))}
            </select>
        );
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
                <label htmlFor="favoriteGame">Favorite Game: </label>
                <FavoriteDropdown gameList={gameList} />
				</div>
				<div>
				
					<label htmlFor="gamesPlayed">Games Played:</label>
					<PlayedDropdown gameList={gameList} />
					<button onClick={addToHolder}>Add to games played</button>

				</div>
				<div>
				<ul>
				{gamesPlayedHolder.map((game, index) => (
                    
					<li key={index}>
					{game}
					<button onClick={() => removeFromHolder(index)}>
					Remove
					</button>
					</li> 

                ))}
				</ul>
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
