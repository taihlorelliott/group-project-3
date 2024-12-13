import {useState} from "react";
import {GAMES_URL} from "../../App.jsx";

const EditGame = ({game}) => {
// isEditing determines wether you're in "edit mode" or not
// When you're not in "edit mode", it's set to false and shows the "edit" button
// When you're in edit mode, it's set to true and shows the edit form
    const [isEditing, setIsEditing] = useState(false); 
    const [gameInfo, setGameInfo] = useState({
        name: game.name,
        year: game.year,
        platform: game.platform,
        genre: game.genre,
    });

    const handleInputChange = (event) => {
    // handleInputChange is called when you type in input box
        const {name, value} = event.target;
        // ... spread keeps the OG info from what was there before you edit
        // [name] will either be name, year, platform, or genre (value is what you're typing)
        setGameInfo({...gameInfo, [name]: value });
    };

    const handleEditMode = () => {
    // Changes edit mode off and on (false and true)
    // So if edit mode is off (false) and you click the edit button, this will turn it on (true)
    // Same goes the for the opposite. If edit mode is on (true), this will turn it off (false)
        if (isEditing) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };  

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents page reload
        // Send put request to server to update game info. game._id is individual game info to be edited
        const response = await fetch(`${GAMES_URL}/${game._id}`, {
        method: "PUT",
        headers: {
            // This means that the type of info being requested from server is JSON
            "Content-Type": "application/json",
        },
        // stringify is what it sounds like, turns JSON data from input into a string. Pretty cute
        body: JSON.stringify(gameInfo),
        });  
        setIsEditing(false); // Turn off edit mode
    };  

    return (
        <div>
        {isEditing ? ( // So if isEditing is true, aka you're in edit mode, it shows the form to edit info
            <form onSubmit={handleSubmit}>
            <label>Name:
                <input
                type="text"
                name="name"
                value={gameInfo.name}
                onChange={handleInputChange}
                />
            </label>
            <label>Year:
                <input
                type="text"
                name="year"
                value={gameInfo.year}
                onChange={handleInputChange}
                />
            </label>
            <label>Platform:
                <input
                type="text"
                name="platform"
                value={gameInfo.platform}
                onChange={handleInputChange}
                />
            </label>
            <label>Genre:
                <input
                type="text"
                name="genre"
                value={gameInfo.genre}
                onChange={handleInputChange}
                />
            </label>
            <button type="submit">Save</button>
            {/* Save submits info, cancel just turns edit mode off */}
            <button type="button" onClick={handleEditMode}>Cancel</button>
            </form>
        ) : ( // And if isEditing is false, aka not in edit mode, it shows the edit button!
            <button onClick={handleEditMode}>Edit</button>
        )}
        </div>
    );
    };

export default EditGame;
