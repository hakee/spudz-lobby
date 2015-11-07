var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Account  = require('./account');

var matchSchema = new Schema({
  account1: [Account],
  account2: [Account],
  isTournament: Boolean,
  winner: Boolean,
  score: String,
  startTime: Number
});

module.exports = mongoose.model('Match', matchSchema);
