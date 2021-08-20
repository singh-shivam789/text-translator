const express = require('express');
const translator = require('@vitalets/google-translate-api');
const path = require('path');
const db = require('./config/mongoose');

const TranslationModel = require('./models/translation_schema');
const port = process.env.PORT || 5000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', (req, res) => {
	return res.render('index',{
		title: 'Text Translator',
		translatedText:''
	});	
});

app.post('/', (req, res) => {	
	TranslationModel.findOne({
		inputText: req.body.text,
		translationLanguage: req.body.language
	}, (err, translation) => {
		if(err){
			console.log('Error', err); 
			return res.status(500).send(' Internal Server Error :-(');
		}
		if(!translation){
			translator(req.body.text, {to: req.body.language}).then((textResponse) => {
				TranslationModel.create({
					inputText: req.body.text,
					translatedText: textResponse.text,
					translationLanguage: req.body.language
				}, (err) => {
					if(err){
						console.log('Error', err); 
						return res.status(500).send(' Internal Server Error :-(');
					}
					else{
						return res.render('index', {
							title: 'Text Translator',
							translatedText: textResponse.text
						});
					}
				});
			}).catch((err) => {
				console.log('Error', err); 
				return res.status(500).send(' Internal Server Error :-(');
			});
		}
		else{
			console.log('Found!');
			return res.render('index', {
				title: 'Text Translator',
				translatedText: translation.translatedText
			});
		}
	});
});

app.listen(port, (err) => {
	if(err){
		console.log('Error', err);
	}
	else{
		console.log(`Server running on port: ${port}`);
	}
});

module.exports = app;