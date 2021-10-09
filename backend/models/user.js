const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');


const userSchema = new mongoose.Schema({
    username :  String,
    password : String,
    googleId: String,
    secret: String,
    firstname: String,
    lastname: String,
})


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = User;
