//requiring mongoose
const mongoose = require('mongoose');

let password = encodeURIComponent('singh123');
mongoose.connect(`mongodb+srv://shivam:${password}@cluster0.p1bac6v.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
	.then(() => {
		console.log('Connected to MongoDB');
	}).catch((err) => {
		console.log(err);
	});
