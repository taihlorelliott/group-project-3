const mongoose = require("mongoose")

const playerSchema = mongoose.Schema({
  name: String,
  favoriteGame: String,
  gamesPlayed: [],
})

const Player = mongoose.model("Player", playerSchema)

module.exports = Player