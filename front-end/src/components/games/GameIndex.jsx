// show all games

import ShowGame from "./ShowGame.jsx";
import { GAMES_URL } from "../../App.jsx";
import { useState, useEffect } from 'react';
import EditGame from "./EditGame.jsx";
import NewGame from "./NewGame.jsx";



//put specific prop in {} if calling just one prop
const GameIndex = ({handleSection}) => {
	

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


	return (
		<div>
			<button onClick={handleSection} value="NewGame">Add New Game</button>
			<h2>Game Index</h2>
			<ul>
				{games.map((game, index) => (
					<li key={index}>
						<ShowGame game={game} />
						<EditGame game={game} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default GameIndex;
