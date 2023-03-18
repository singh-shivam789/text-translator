//requiring dependencies
const express = require("express");
const translateAPI = require("@vitalets/google-translate-api").translate;
const path = require("path");
const TranslationModel = require("./models/translation_schema");
const cors = require("cors");
//defining port
const port = process.env.PORT || 5000;

//initializing express app
const app = express();
app.use(cors());
//app settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//app middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//handling routes
app.get("/", (req, res) => {
  return res.render("index", {
    title: "Text Translator",
    translatedText: "",
  });
});

app.post("/", async (req, res) => {
  try {
    let translation = await TranslationModel.findOne({
      inputText: req.body.text,
      translationLanguage: req.body.language,
    });
    if (!translation) {
      let textResponse = await translateAPI(req.body.text, {
        to: req.body.language,
      });
      await TranslationModel.create({
        inputText: req.body.text,
        translatedText: textResponse.text,
        translationLanguage: req.body.language,
      });
      return res.render("index", {
        title: "Text Translator",
        translatedText: textResponse.text,
      });
    } else {
      //if a translation is found, as there is no need to store it again, returning the saved translation
      return res.render("index", {
        title: "Text Translator",
        translatedText: translation.translatedText,
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).send(" Internal Server Error :-(");
  }
});

//listening to port
app.listen(port, (err) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(`Server running on port: ${port}`);
  }
});

module.exports = app;
