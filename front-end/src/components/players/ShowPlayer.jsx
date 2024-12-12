// show specific player

const ShowPlayer = ({ player }) => {
	return (
		<>
			<div className="ShowPlayerDiv">
				<h3> {player.name} </h3>
				<p> Favorite Game: {player.favoriteGame} </p>
				<p> Games Played:</p>
                <ul>
                {player.gamesPlayed.map((game, index) => (
                    <li key={index}>{game}</li>
                ))}
                </ul>
			</div>
		</>
	);
};

export default ShowPlayer;