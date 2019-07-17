const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String, unique:true},
  password: String,
  fullname:String,
  apikey: String,
  secretKey: String,
  balance:String,
  tradeHistory:{type: Array}
  //tradeHistory:[{type: String}]

}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;