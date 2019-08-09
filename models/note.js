// vorpal/models/note.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    text: String,
    userId: String,
    created: Date,
    updated: Date,
    started: Boolean,
    completed: Boolean
});

module.exports = mongoose.model('Note', NoteSchema);