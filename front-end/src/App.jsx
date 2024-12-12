// src/app.jsx
// imports
import { useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/Home.jsx";
import GameIndex from "./components/games/GameIndex.jsx";
import PlayerIndex from "./components/players/PlayerIndex.jsx";

const App = () => {
	const [currentPage, setCurrentPage] = useState("Home");

	const handleSection = (event) => {
		setCurrentPage(event.target.value);
	};

	const games = [
		{
			name: "Game",
			genre: "Action",
			year: "1900",
			platform: "Coffee Maker",
		},
		{
			name: "Game2",
			genre: "Puzzle",
			year: "1901",
			platform: "Coffee Maker 2",
		},
	];

	return (
		<>
			<Navbar handleSection={handleSection} className="nav" />
			<div className="display">
				{currentPage === "Home" ? <Home /> : ""}
				{currentPage === "GameIndex" ? <GameIndex games={games} /> : ""}
				{currentPage === "PlayerIndex" ? <PlayerIndex /> : ""}
			</div>
		</>
	);
};

export default App;
