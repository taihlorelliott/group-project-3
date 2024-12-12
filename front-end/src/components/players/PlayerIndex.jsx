// show all games

import ShowPlayer from "./ShowPlayer.jsx";
import { PLAYERS_URL } from "../../App.jsx";
import { useState, useEffect } from 'react';

const PlayerIndex = () => {
	const [players, setPlayers] = useState([]); // set state variable
	useEffect(() => {
		const getPlayerIndex = async () => { // define function to call it
			try {
				const res = await fetch(PLAYERS_URL);
				let JSONdata = await res.json();
				setPlayers(JSONdata);
			} catch (err) {
				console.log(err);
			}
		};
		getPlayerIndex(); // do dis
	}, []);

	return (
		<div>
			<h2>Player Index</h2>
			<ul>
				{players.map((player, index) => (
					<li key={index}>
						<ShowPlayer player={player} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default PlayerIndex;
