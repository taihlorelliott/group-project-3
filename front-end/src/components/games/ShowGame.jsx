// show specific game
import { useState, useEffect } from "react";
import { GAMES_URL } from "../../App";
import '../../index.css';

// bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'

const ShowGame = ({ handleSection, storedGameId }) => {
	const [game, setGame] = useState({name: "", year: "", platform: "", genre: ""}); // set state variable

	useEffect(() => {
		const getGameData = async () => {
			// define function to call it
			try {
				const res = await fetch(`${GAMES_URL}/${storedGameId}`);
				let JSONdata = await res.json();
				setGame(JSONdata);
			} catch (err) {
				console.log(err);
			}
		};
		getGameData(); // do dis
	}, []);

	return (
		<div className="bg-dark">
			<div className="ms-2">
				<h3 className="text-danger"> {game.name} </h3>
				<p className="text-light"> Genre: {game.genre} </p>
				<p className="text-light"> Year: {game.year} </p>
				<p className="text-light"> Platform: {game.platform} </p>
			</div>
			<div>
				<button className="btn btn-info me-2 btn-sm ms-2" onClick={handleSection} value="EditGame">
					Edit
				</button>
				<button className="btn btn-info me-2 btn-sm ms-2" onClick={handleSection} value="GameIndex">
					Back to Games
				</button>
			</div>
		</div>
	);
};

export default ShowGame;

{
	/* <form>
	<select name="name" id="name">
		<option value={game._id}>{game.name}</option>
	</select>
</form>; */
}
