//requiring frameworks and files
const express = require('express');
const translator = require('@vitalets/google-translate-api');
const path = require('path');
const db = require('./config/mongoose');
const TranslationModel = require('./models/translation_schema');

//defining port
const port = process.env.PORT || 5000;

//initializing express app
const app = express();

//app settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//app middlewares
app.use(express.urlencoded());
app.use(express.static('assets'));

//handling routes
app.get('/', (req, res) => {
	return res.render('index',{
		title: 'Text Translator',
		translatedText:''
	});	
});

app.post('/', (req, res) => {
	//finding translated text corresponding to req.body.text and req.body.language
	TranslationModel.findOne({
		inputText: req.body.text,
		translationLanguage: req.body.language
	}, (err, translation) => {
		if(err){
			console.log('Error', err); 
			return res.status(500).send(' Internal Server Error :-(');
		}
		if(!translation){
			//if a translation is not found, creating new translation and saving it in db and sending it as a response 
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
			//if a translation is found, as there is no need to store it again, returning the saved translation
			return res.render('index', {
				title: 'Text Translator',
				translatedText: translation.translatedText
			});
		}
	});
});

//listening to port
app.listen(port, (err) => {
	if(err){
		console.log('Error', err);
	}
	else{
		console.log(`Server running on port: ${port}`);
	}
});

module.exports = app;