// show all games

import ShowGame from "./ShowGame.jsx";

const GameIndex = ({ games }) => {
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
