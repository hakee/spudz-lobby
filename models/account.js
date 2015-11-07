var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Match    = require('./match');

var accountSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  wins: Number,
  totalGames: Number,
  matches: [Match],
  token: String
});

module.exports = mongoose.model('Account', accountSchema);
