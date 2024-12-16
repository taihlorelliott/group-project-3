import { useState, useEffect } from "react";
import { PLAYERS_URL } from "../../App";


const ShowPlayer = ({ handleSection, storedPlayerId }) => {
	const [player, setPlayer] = useState({
		name: "",
		favoriteGame: "",
		gamesPlayed: [],
	});

	useEffect(() => {
		const getPlayerData = async () => {
			try {
				const res = await fetch(`${PLAYERS_URL}/${storedPlayerId}`);
				let JSONdata = await res.json();
				setPlayer(JSONdata);
			} catch (err) {
				console.log(err);
			}
		};
		getPlayerData();
	}, []);

	return (
		<>
			<div className="ShowPlayerDiv">
				<h3> {player.name} </h3>
				<p> Favorite Game: {player.favoriteGame} </p>
				<p> Games Played:</p>
				{player.gamesPlayed.length ? (
					<ul>
						{player.gamesPlayed.map((game, index) => (
							<li key={index}>{game}</li>
						))}
					</ul>
				) : (
					<p>Try adding a game from our game section!</p>
				)}
			</div>
			<div>
				<button onClick={handleSection} value="EditPlayer">
					Edit
				</button>
				<button onClick={handleSection} value="PlayerIndex">
					Back to Players
				</button>
			</div>
		</>
	);
};

export default ShowPlayer;
