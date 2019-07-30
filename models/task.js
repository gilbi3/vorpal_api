// vorpal/models/task.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    title: String,
    text: String,
    duedate: Date,
    created: Date,
    updated: Date,
    started: Boolean,
    startedDate: Date,
    completed: Boolean,
    completedDate: Date
});

module.exports = mongoose.model('Task', TaskSchema);