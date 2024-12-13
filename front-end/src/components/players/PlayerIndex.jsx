// show all games

// import ShowPlayer from "./ShowPlayer.jsx";
import { PLAYERS_URL } from "../../App.jsx";
import { useState, useEffect } from 'react';
import EditPlayer from "./EditPlayer.jsx";





const PlayerIndex = ({handleSection}) => {
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
			<button onClick={handleSection} value="NewPlayer">Add New Player</button>
			<h2>Player Index</h2>
			<ul>
				{players.map((player, index) => (
					<li key={index}>
						{player.name}
						<EditPlayer player={player} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default PlayerIndex;
