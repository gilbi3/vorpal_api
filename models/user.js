// vorpal/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    created: Date,
    updated: Date
});

module.exports = mongoose.model('User', UserSchema);