// VORPA API


const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
var port = process.env.PORT || 8080;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var Note = require('./models/note');
var Task = require('./models/task');
var User = require('./models/user');

mongoose.connect('mongodb+srv://dev:test123@vorpaldb-a1b8k.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
	.catch((e) => {
		console.log(e)
	});

var db = mongoose.connection;

db.once('open', function () {
	console.log("DB connection alive");
});


// Users -----------------------------------------------------------


app.get("/user/:username", async (req, res) => {
	try{
		User.findOne({username: req.params.username}, function (err, user) {
			if (err){
				res.send(err);
			}
			res.json(user);
		});
	}
	catch(e){
		res.status(500).send(e);
	}
});

app.post("/user", async (req, res) => {
	try{
		var newUser = new User(req.body);
		newUser.created = new Date();
		newUser.updated = newUser.created;
		var result = newUser.save();
		res.send(result);
	}
	catch (e){
		res.status(500).send(e);
	}
});


app.post("/user/login", async (req, res) => {
	try{
		User.findOne({username: req.body.username}, function (err, user) {
			if (err){
				res.send(err);
			}
			if(user.password == req.body.password){
				res.status(200).send("Match confirmed. Log on, buddy.");
			}else{
				res.status(403).send("Incorrect password");
			}
		});
	}
	catch(e){
		res.status(500).send(e);
	}
})


// Notes -----------------------------------------------------------


app.get("/notes", async (req, res) => {
	try {
		Note.find({}, function (err, notes) {
			var noteArray = [];

			notes.forEach(function (note) {
				noteArray.push(note);
			});

			res.send(noteArray);
		});
	}
	catch (e) {
		res.status(500).send(e);
	}
});

app.get("/notes/:id", async (req, res) => {
	try {
		Note.findById(req.params.id, function (err, note) {
			if (err)
				res.send(err);
			res.json(note);
		});
	}
	catch (e) {
		res.status(500).send(e);
	}
});

app.post("/notes", async (req, res) => {
	try {
		var note = new Note(req.body);
		var actionDate = new Date();
		note.created = note.updated = actionDate;
		var result = note.save();
		res.send(result);
	}
	catch (e) {
		res.status(500).send(e);
	}

});

app.put("/notes/:id", async (req, res) => {
	try {
		var note = await Note.findById(req.params.id).exec();
		note.set(req.body);
		note.updated = new Date();
		var result = await note.save();
		res.send(result);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.delete("/notes/:id", async (req, res) => {
	try {
		var result = await Note.deleteOne({ _id: req.params.id }).exec();
		res.send(result);
	} catch (e) {
		res.status(500).send(e);
	}
});


// Tasks -----------------------------------------------------------


app.get("/task", async (req, res) => {
	try {
		Task.find({}, function (err, tasks) {
			var taskArray = [];

			tasks.forEach(function (task) {
				taskArray.push(task);
			});

			res.send(taskArray);
		});
	}
	catch (e) {
		res.status(500).send(e);
	}
});

app.get("/task/:id", async (req, res) => {
	try {
		Task.findById(req.params.id, function (err, task) {
			if (err)
				res.send(err);
			res.json(task);
		});
	}
	catch (e) {
		res.status(500).send(e);
	}

});

app.post("/task", async (req, res) => {
	try {
		var task = new Task(req.body);
		var actionDate = new Date();
		task.created = task.updated = actionDate;
		var result = task.save();
		res.send(result);
	}
	catch (e) {
		res.status(500).send(e);
	}

});

app.put("/task/:id", async (req, res) => {
	try {
		var task = await Task.findById(req.params.id).exec();
		task.set(req.body);
		task.updated = new Date();
		var result = await task.save();
		res.send(result);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.delete("/task/:id", async (req, res) => {
	try {
		var result = await Task.deleteOne({ _id: req.params.id }).exec();
		res.send(result);
	} catch (e) {
		res.status(500).send(e);
	}
});


// -----------------------------------------------------------


app.listen(port)