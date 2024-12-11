const mongoose = require("mongoose")

const gameSchema = mongoose.Schema({
  name: String,
  year: String,
  platform: String,
  genre: String,
})

const Game = mongoose.model("Game", gameSchema)

module.exports = Game