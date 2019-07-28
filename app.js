const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 7000

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
		var result = await note.save();
		res.send(result);
	} catch (e) {
		res.status(500).send(e);
	}
});


app.listen(port)