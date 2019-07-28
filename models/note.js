// vorpal/models/note.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    text: String,
    created: Date,
    updated: Date
});

module.exports = mongoose.model('Note', NoteSchema);