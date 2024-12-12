// show all games

import ShowGame from "./ShowGame.jsx";
import { GAMES_URL } from "../../App.jsx";
import { useState, useEffect } from 'react';

const GameIndex = () => {
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
			<h2>Game Index</h2>
			<ul>
				{games.map((game, index) => (
					<li key={index}>
						<ShowGame game={game} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default GameIndex;
