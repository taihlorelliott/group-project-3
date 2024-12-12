// show specific game

const ShowGame = ({games}) => {
    return (
        <>
            <h2>Games</h2>
            <div className="ShowGameDiv">
                {games.map((game, index) => (
                    <div className="ShowGame" key={index}>
                        <h3> {game.name} </h3>
                        <p> Genre: {game.genre} </p>
                        <p> Year: {game.year} </p>
                        <p> Platform: {game.platform} </p>
                    </div>
                ))};
            </div>
        </>
    );
};

export default ShowGame;