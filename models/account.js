var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var accountSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  admin: Boolean
});

module.exports = mongoose.model('Account', accountSchema);
