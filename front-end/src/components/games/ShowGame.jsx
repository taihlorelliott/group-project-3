// show specific game
import { useState, useEffect } from "react";
import { GAMES_URL } from "../../App";

const ShowGame = ({ handleSection, storedGameId }) => {
	const [game, setGame] = useState({}); // set state variable

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
		<>
			<div className="ShowGameDiv">
				<h3> {game.name} </h3>
				<p> Genre: {game.genre} </p>
				<p> Year: {game.year} </p>
				<p> Platform: {game.platform} </p>
			</div>
			<div>
				<button onClick={handleSection} value="EditGame">
					Edit
				</button>
				<button onClick={handleSection} value="GameIndex">
					Back to Games
				</button>
			</div>
		</>
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
