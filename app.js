const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var Note = require('./models/note');

mongoose.connect('mongodb+srv://dev:test123@vorpaldb-a1b8k.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }).catch((e) => {
	console.log(e)
});

var db = mongoose.connection;

db.once('open', function () {
	console.log("DB connection alive");
});

app.get("/notes", async (req, res) => {
	try{
		Note.find({}, function(err, notes) {
			var noteMap = {};
		
			notes.forEach(function(note) {
			  noteMap[note._id] = note;
			});
		
			res.send(noteMap);  
		  });
	}
	catch(e){
		res.status(500).send(e);
	}
});

app.get("/notes/:id", async (req, res) => {
	try{
		Note.findById(req.params.id, function (err, note) {
			if (err)
				res.send(err);
			res.json(note);
		});
	}
	catch(e){
		res.status(500).send(e);
	}
	
});

app.post("/notes", async (req, res) => {
	try {
		var note = new Note(req.body);
		note.created = node.updated = new Date();
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
		var result = await Note.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
	} catch (e) {
		res.status(500).send(e);
	}
});


app.listen(port)