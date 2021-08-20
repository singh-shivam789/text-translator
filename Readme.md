# Text Translator

A web server with a RESTful API to translate a text from one language to another using Google Translate API.

---
## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environment.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/singh-shivam789/text-translator
    $ cd text-translator
    $ npm install

## Running the project

    $ npm start

## For testing

    $ npm test

---

## Code Overview

### Server-Side
- Used Node.js, Express.js and MongoDB and Mongoose.js
    #### Dependencies

  - [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
  - [ejs](https://ejs.co/) - View engine 
  - [@vitalets/google-translate-api](https://www.npmjs.com/package/@vitalets/google-translate-api) -A free and unlimited API for Google Translate 💵 🚫 for Node.js.B data to javascript 
  - [mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment
  - [chai](https://www.npmjs.com/package/chai) - Assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
  - [chai-http](https://www.npmjs.com/package/chai-http) -Extend Chai Assertion library with tests for http apis
  - [eslint](https://www.npmjs.com/package/eslint) -ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. In many ways, it is similar to JSLint and JSHint with a few exceptions.
  - [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) -Airbnb's base JS ESLint config, following our styleguide
  - [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) -This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names
  - [mocha](https://www.npmjs.com/package/mocha) -JavaScript test framework for Node.js & The Browser

  #### Application Structure

  - `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the model and handles routes which we'll be using in the application.
  - `config/` - This folder contains configuration for mongoose 
  - `models/` - This folder contains the schema definition for my Mongoose model.
  - `test/` - This folder contains the configuration for testing framework.

  #### Schema
    ```
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
    ```
    As I had to **avoid repeated hits to Google API**, the schema is defined such that for **every document** that is saved into the database, I have the **input text, translation language and the text translated** using the Google API.  
     &nbsp;
    Using this schema, given the input text and the translation language, we can easily find **if the database already contains any translation with same input text and language.** 
    
        If it exists, then we can return the translation to the template without hitting the Google API.
        Else, we can create a translation and save it in the database.

    #### Testing
    - Chai is used as an assertion library along with and Mocha to test the API.
    - **should()** assertion style is used.
        &nbsp;
        Here, I'm testing the status returned by request and response routes.
        &nbsp;
        ```
        //creating test using mocha
        describe('Translations API', () => {
	
        // Testing GET route
        describe('GET /', () => {
            it('It should GET the App', (done) => {
                chai.request(server)
                    .get('/')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });

            it('It should NOT GET the App', (done) => {
                chai.request(server)
                    .get('/xyz')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
        });
        ```

        
        Similarly all other routes are also tested.         
&nbsp;
### Front-End

- HTML, CSS, Bootstrap 5 and Javascript is used.

#### Design

I wanted the color theme to be dark and catchy. 

![Final Design ](assets\images\design.png)

#### Elements
  -   **textarea element** is used to take input text and show translated text
  -   **select element** is used to provide the user the different options to choose translation       langauge from. 
  - **Bootstrap 5** is used for responsive layout. 
  - **Copy Translation** button is there to **copy the translated text and further translate it into any other language.**
    
        





