//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema
var nameSchema = new Schema({
  name: String,
  url: String,
});

//Return model
module.exports = mongoose.model('Name', nameSchema);
