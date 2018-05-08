//grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var postSchema = new Schema({
//   id : Number, 
//   text : String


// });

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  personname: {type: String},
  age: {type: Number},
  birthday:{type: Date},
  gender: {type: String},
  about: {type: String},
  afamily: {type: String},
  highestEducation: {type: String},
  achivementInCareer: {type: String},
  motto: {type: String},
  lovedOne: {type: String},
  story: {type:String},
  images: Array
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
