import { useState, useEffect } from "react";
import { PLAYERS_URL } from "../../App";
import '../../index.css';

// bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'

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
		<div className="bg-dark">
			<div className="ms-2">
				<h3 className="text-danger"> {player.name} </h3>
				<p className="text-light"> Favorite Game: {player.favoriteGame} </p>
				<p className="text-light"> Games Played:</p>
				{player.gamesPlayed.length ? (
					<ul>
						{player.gamesPlayed.map((game, index) => (
							<li className="text-light" key={index}>{game}</li>
						))}
					</ul>
				) : (
					<p className="text-light" >Try adding a game from our game section!</p>
				)}
			</div>
			<div>
				<button className="btn btn-info me-2 btn-sm ms-2" onClick={handleSection} value="EditPlayer">
					Edit
				</button>
				<button className="btn btn-info me-2 btn-sm ms-2" onClick={handleSection} value="PlayerIndex">
					Back to Players
				</button>
			</div>
		</div>
	);
};

export default ShowPlayer;
