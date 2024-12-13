
// imports
import { useState, useEffect } from "react";
import { GAMES_URL, PLAYERS_URL } from "../../App";

//set up use state
const NewPlayer = ({handleSection}) => {
    const [player, setPlayer] = useState({
        name: "",
        favoriteGame: "",
        gamesPlayed: [],
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
            gamesPlayed: [],
        });
    };

    const [gameList, setGameList] = useState([]);
    const [favorite, setFavorite] = useState();

    const handleDropdown = () => {
    }
        useEffect(() => {
            const getGamesIndex =  async () => {
                try {
                    const res = await fetch(GAMES_URL);
                    let JSONdata = await res.json();
                    setGameList(JSONdata);
                } catch (err) {
                    console.log(err);
                }
            };
            getGamesIndex();
            },
        []);

    //     // let optionItems = GAMES_URL.map((item) =>
    //     //     <option key={item.GAMES_URL}>{item.GAMES_URL}</option>
    //     // );
    //     const handleFaveChange = (event) => {
    //         setFavorite(event.target.value);
    //     };
    // };

    const Dropdown = ({gameList}) => {
        return (
            <select>
                {gameList.map((game, index) => (
                    <option key={index} value={game._id}>
                        {game.name}
                    </option>
                ))};
            </select>
        );
    };

    return (
        <>
            {/* <h2>{player}</h2> */}
            <h2>Add Player</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Username: </label>
                <input
                    id="name"
                    name="name"
                    value={player.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="favoriteGame">Favorite Game: </label>
                {/* <select
                    id="favoriteGame"
                    name="favoriteGame"
                    // value={favorite}
                    // onChange={handleDropdown}
                    required>
                    <option disabled value="">Select Favorite...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select> */}
                <div>
                    <Dropdown gameList={gameList}/>
                </div>

                {/* we dont need below this but we keep it here */}
                {/* <label htmlFor="gamesPlayed">Games Played: </label>
                <input
                    id="gamesPlayed"
                    name="gamesPlayed"
                    value={player.gamesPlayed}
                    onChange={handleChange}
                    required
                /> */}
                <button type="submit"> Submit Player </button>
                <button value="PlayerIndex" onClick={handleSection}>Back to Players</button>
            </form>
        </>
    );
 };

 export default NewPlayer;