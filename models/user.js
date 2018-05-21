//grab the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    yourMemorial: {type: Schema.Types.ObjectId, ref:'Memorial'},
    contributedMemorial: [{ type: Schema.Types.ObjectId, ref: 'Memorial' }]
});

var memorialSchema = new Schema({
    _id : Schema.Types.ObjectId,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    otherContributors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    personName: {type: String},
    age: {type: Number},
    birthday:{type: Date},
    gender: {type: String},
    about: {type: String},
    aboutFamily: {type: String},
    highestEducation: {type: String},
    achievementInCareer: {type: String},
    motto: {type: String},
    lovedOne: {type: String},
    story: {type:String},
    legacy: {type:String},
    privacy: {type: String},
    profileImg: { data: Buffer, contentType: String},
    images: Array
});

userSchema.methods.generateHash = function(password) {
    console.log(password);
    return bcrypt.hashSync(password,  bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
    if(password != null) {
        return bcrypt.compareSync(password, this.password);
    } else {
        return false;
    }
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);
var Memorial = mongoose.model('Memorial', memorialSchema);

// make this available to our users in our Node applications
module.exports = {
    User: User,
    Memorial : Memorial
};