// show all games

import ShowPlayer from "./ShowPlayer";

const PlayerIndex = ({ players }) => {
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
