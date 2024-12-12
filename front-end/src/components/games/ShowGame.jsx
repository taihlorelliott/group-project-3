// show specific game

const ShowGame = ({ game }) => {
	return (
		<>
			<div className="ShowGameDiv">
				<h3> {game.name} </h3>
				<p> Genre: {game.genre} </p>
				<p> Year: {game.year} </p>
				<p> Platform: {game.platform} </p>
			</div>
		</>
	);
};

export default ShowGame;
