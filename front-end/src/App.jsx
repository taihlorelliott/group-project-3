// src/app.jsx
// imports
import { useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/Home.jsx";
import GameSection from "./components/games/GameSection.jsx";
import PlayerSection from "./components/players/PlayerSection.jsx";
import './index.css';
import './app.scss'

// bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'

const GAMES_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/games`;
const PLAYERS_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/players`;

const App = () => {
	const [currentPage, setCurrentPage] = useState("Home");

	const handleSection = (event) => {
		setCurrentPage(event.target.value);
	};

	return (
		<div className="bg-dark">
			<Navbar handleSection={handleSection} className="nav" />
			<div className="bg-dark" >
				{currentPage === "Home" ? <Home /> : ""}
				{currentPage === "GameSection" ? <GameSection /> : ""}
				{currentPage === "PlayerSection" ? <PlayerSection /> : ""}
			</div>
			
		</div>
	);
};

export {App, GAMES_URL, PLAYERS_URL};