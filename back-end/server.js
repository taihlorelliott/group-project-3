// require
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const app = express();
const path = require('path')
const cors = require('cors')

//import models
const Game = require('./models/game.js');
const Player = require('./models/player.js');


const port = process.env.PORT ? process.env.PORT : 3003;

// connection
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`connected to the pookie project, ${mongoose.connection.name}`);
});

//==============middle ware====================

//allows us to use req.body (this can be used for res.json)
app.use(express.urlencoded({extended:false}));
//allows us to use static files from the directory
app.use(express.static(path.join(__dirname, "public")));
//allows updates and delete from forms
app.use(methodOverride("_method"));
//use morgan please for debugging 
app.use(morgan("dev"));
//use json
app.use(express.json());
//use cors
app.use(cors())

//=================routes======================

//allow user to post games
app.post('/games', async (req, res) => {
    const addedGame = await Game.create(req.body);
    res.json(addedGame);
})

//allow user to create player
app.post('/players', async (req, res) => {
    const addedPlayer = await Player.create(req.body);
    res.json(addedPlayer);
});

//find games 
app.get('/games', async (req, res) => {
    const foundGames = await Game.find();
    res.json(foundGames);
});

//find one game
app.get('/games/:gameId', async (req, res) => {
    const foundGame = await Game.findById(req.params.gameId);
    res.json(foundGame);
});

//find players
app.get('/players', async (req, res) => {
    const foundPlayers = await Player.find();
    res.json(foundPlayers);
});

//find one player
app.get('/games/:playerId', async (req, res) => {
    const foundPlayer = await Game.findById(req.params.gameId);
    res.json(foundPlayer);
});

//delete games
app.delete('/games/:gameId', async (req, res) => {
    const deleteGame = await Game.findByIdAndDelete(req.params.gameId);
    res.json(deleteGame);
});

// delete player
app.delete('/players/:playerId', async (req, res) => {
    const deletePlayer = await Player.findByIdAndDelete(req.params.playerId);
    res.json(deletePlayer);
});

//update a game
app.put ('/games/:gameId', async (req, res) => {
    const updateGame = await Game.findByIdAndUpdate(
        req.params.gameId, 
        req.body, 
        {new: true}
    )
    res.json(updateGame);
});

// update specific player
app.put('/players/:playerId', async (req, res) => {
    const updatePlayer = await Player.findByIdAndUpdate(
        req.params.playerId, // how to find it
        req.body, // what you're updating it to
        {new:true} // return values after they have been updated instead of showing original item
    );
    res.json(updatePlayer);
});

//listen to things
app.listen(port, () => {
    console.log(`Listening to the pookiannas on port ${port}!`);
});