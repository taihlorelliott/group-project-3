// Comments for everything (EXCEPT GAME EDITING FUNCTIONS) in EditGame because it's pretty much the same :-)

import {useState} from "react";
import {PLAYERS_URL} from "../../App.jsx";

const EditPlayer = ({ player }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerInfo, setPlayerInfo] = useState({
        name: player.name,
        favoriteGame: player.favoriteGame,
        gamesPlayed: [...player.gamesPlayed], // gamesPlayed needs to be an array -_-
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setPlayerInfo({...playerInfo, [name]: value });
    };

    // We need specific functions to handle editing gamesPlayed -_-
    const handleGameChange = (index, value) => { // index = specific game in gamesPlayed, value = whatever's typed into input
        // editedGames keeps the OG list of games from player info with spread
        const editedGames = [...playerInfo.gamesPlayed];
        // Sets old game at whatever index to new game entered into input
        editedGames[index] = value;
        // Update player info
        setPlayerInfo({ ...playerInfo, gamesPlayed: editedGames });
    };

    // Adds a new blank game to list of gamesPlayed
    const addGame = () => {
        // Create new array with another blank game, ""
        // Spreads OG player info
        // Updates playerInfo including new game
        setPlayerInfo({ ...playerInfo, gamesPlayed: [...playerInfo.gamesPlayed, ""] });
    };

    const removeGame = (index) => {
        // Use filter to create new array the REMOVES specific game at specific index
        // You must excuse me
        // I have grown quite wheareh
        // Iterates over each game to decide if it's good enough to be in the final cut
        // (_, i) = arguments. _ is current game, i is index of current game
        // i !== index checks if current index is not equal to the index of game to be removed
        // If i!==index is true, game is included in new game array. AND VICE VERSA
        // filter returns new array with only games that made the cut (if i!==index is true)
        const editedGames = playerInfo.gamesPlayed.filter((_, i) => i !== index);
        // UPDATE PLAYER INFOOOOO
        setPlayerInfo({ ...playerInfo, gamesPlayed: editedGames });
    };

    const handleEditMode = () => {
        if (isEditing) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };  

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const response = await fetch(`${PLAYERS_URL}/${player._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(playerInfo),
        });  
        setIsEditing(false); 
    };  

    return (
        <div>
        {isEditing ? ( 
            <form onSubmit={handleSubmit}>
            <label>Name:
                <input
                type="text"
                name="name"
                value={playerInfo.name}
                onChange={handleInputChange}
                />
            </label>
            <label>Favorite Game:
                <input
                type="text"
                name="favoriteGame"
                value={playerInfo.favoriteGame}
                onChange={handleInputChange}
                />
            </label>
            <label>Games Played:
                {/* Iterates over each game */}
                {playerInfo.gamesPlayed.map((game, index) => ( // game is current game, index is index of current game
                    // Div for adding and removing specific game
                    <div key={index}>
                        <input
                            type="text"
                            value={game}
                            // handleGameChange is called when someone types, and it updates the game
                            onChange={(event) => handleGameChange(index, event.target.value)}
                        />
                        <button
                            type="button"
                            // CALLS REMOVEGAME FUNCTION TO REMOVE THE GAME OF THIS SPECIFIC INDEX!!!!!!!! HOLY SHIT THATS CRAZYYYY!!!
                            onClick={() => removeGame(index)}
                        >Remove
                        </button>
                    </div>
                ))}
                {/* Add game button calls addGame function */}
                <button type="button" onClick={addGame}>Add Game</button>
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={handleEditMode}>Cancel</button>
            </form>
        ) : ( 
            <button onClick={handleEditMode}>Edit</button>
        )}
        </div>
    );
    };

export default EditPlayer;
