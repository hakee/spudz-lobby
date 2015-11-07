var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var accountSchema = new Schema({
  uid: String,
  firstName: String,
  lastName: String
});

module.exports = mongoose.model('Account', accountSchema);
