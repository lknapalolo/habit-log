var mongoose = require('mongoose');

var MeditationSchema = new mongoose.Schema({
  date: String,
  minutes: Number
})

mongoose.model("Meditation", MeditationSchema)
mongoose.connect(process.env.MONGOLAB_URL || "mongodb://localhost/habit-log")

module.exports = mongoose;
