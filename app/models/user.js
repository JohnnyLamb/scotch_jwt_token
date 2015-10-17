// get and instance of the mongoose and mongoose.Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name:String,
  password:String,
  admin:Boolean
});


module.exports = mongoose.model("User",User);

