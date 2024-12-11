// show all games

import ShowGame from "./ShowGame";

const GameIndex = ({games}) => {
    return (
        <div>
            <ul>
                {games.map((game) => {
                    <li key={game.name}>
                        <ShowGame game={game} />
                    </li>
                })}
            </ul>
        </div>
    );
};

export default GameIndex;