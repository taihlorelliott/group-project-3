// show all games
import '../../index.css';

// bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'

import { GAMES_URL } from "../../App.jsx";
import { useState, useEffect } from 'react';

//put specific prop in {} if calling just one prop
const GameIndex = ({handleSection, setStoredGameId}) => {
	

	const [games, setGames] = useState([]); // set state variable
	useEffect(() => {
		const getGamesIndex = async () => { // define function to call it
			try {
				const res = await fetch(GAMES_URL);
				let JSONdata = await res.json();
				setGames(JSONdata);
			} catch (err) {
				console.log(err);
			}
		};
		getGamesIndex(); // do dis
	}, []);

    // lets buttons handleSection & store game at the same time
    const sectionAndStore = (id, event) => {
        setStoredGameId(id)
        handleSection(event)
    }

	return (
		<div className="bg-dark">
			<h2 className="text-danger ms-2">Game Index</h2>
            <button className="btn btn-info me-2 btn-sm ms-2" onClick={handleSection} value="NewGame">Add New Game</button>
			<ul className="d-flex flex-wrap">
				{games.map((game, index) => (
					<li className="d-grid col-1 mt-3 me-3 text-light text-center list-unstyled border border-info rounded p-3 w-auto" key={index}>
						{game.name}
            {/* a button function must use the notation below if you want it to accept parameters */}
             <button className="btn btn-outline-danger me-2 btn-sm ms-2 mt-2" onClick={() => sectionAndStore(game._id, event)} value="ShowGame">More Info</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default GameIndex;