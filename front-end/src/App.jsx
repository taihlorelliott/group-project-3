// src/app.jsx
// imports
import { useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/Home.jsx";
import PlayerIndex from "./components/players/PlayerIndex.jsx";
import GameSection from "./components/games/GameSection.jsx";

const GAMES_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/games`;
const PLAYERS_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/players`;

const App = () => {
	const [currentPage, setCurrentPage] = useState("Home");

	const handleSection = (event) => {
		setCurrentPage(event.target.value);
	};

	return (
		<>
			<Navbar handleSection={handleSection} className="nav" />
			<div className="display">
				{currentPage === "Home" ? <Home /> : ""}
				{currentPage === "GameSection" ? <GameSection /> : ""}
				{currentPage === "PlayerIndex" ? <PlayerIndex /> : ""}
				
			</div>
			
		</>
	);
};

export {App, GAMES_URL, PLAYERS_URL};