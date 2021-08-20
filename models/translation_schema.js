//requiring mongoose
const mongoose = require('mongoose');

//creating the schema
const textSchema = new mongoose.Schema({
	inputText: {
		type: String,
		required: true
	},
	translatedText: {
		type: String,
		required: true
	},
	translationLanguage: {
		type: String,
		required: true
	}
});

//creating the model and exporting it
const TranslationModel = mongoose.model('TranslationModel', textSchema);
module.exports = TranslationModel; 