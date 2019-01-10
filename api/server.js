const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const routes = require('./Routes');

const app = express();
const port = config.port || 6969;

// Connecting to the database
const db = mongoose.connect(config.db);

// setting body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// API routes
app.use('/api', routes);

// Running the server
app.listen(port, () => {
	console.log(`http://127.0.0.1:${port}`)
})

