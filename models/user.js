// vorpal/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    joinDate: Date
});

module.exports = mongoose.model('User', UserSchema);