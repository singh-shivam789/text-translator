//requiring mongoose
const mongoose = require('mongoose');

//connecting to the DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/translator_db');

//acquiring the connection
const db = mongoose.connection;

//if error
db.on('error', console.error.bind(console, 'Error connecting to DB!'));

//else 
db.once('open', () => {
	console.log('Successfully connected to the DB.');
});