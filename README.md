# Progressive Web Apps - The Quote Room

<img width="1352" alt="Screenshot 2023-03-06 at 11 49 07" src="https://user-images.githubusercontent.com/59873140/226754427-3d3cda39-a5cf-4271-9845-4a7c570b2ddc.png">

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Server](#server)
- [Routing](#routing)
- [Pages](#pages)
- [Source](#source)

## Introduction
In this repository you will find my single page application (the client side web application) that I made in WAFS, but this time I will be refactor it in to a server side rendered application. Also I added more functionalitis to it. These were based on the Service Worker and I implemented also a series of optimisation to improve the performance of the application

## Installation
### Clone repo
```
git clone https://github.com/RainbowJM/the-quotes-room-pwa.git
```
For the installation of this application you will need the following:
- NPM
- NodeJS
- Express
- EJS

Extra:
- Nodemon
- Axios
- Request
- Express-minify-html
- Uglify-js
- Npm-run-all

### NPM and NodeJS
To install NPM, use
```
npm install
```
To install NodeJS on MacOS you can use the following command in your terminal
```
brew install node
```
After use the following command to set up you package.json
```
npm init
```
After doing this you will have to answer a few question so the set up, at the end you will get the following package.json file

```json
{
  "name": "the-quotes-room-pwa",
  "version": "1.0.0",
  "description": "Single Page Application of The Quotes Room",
  "main": "app.js",
  "directories": {
    "doc": "docs",
    "example": "examples"
  },
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "all": "npm-run-all --parallel serve api",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/RainbowJM/the-quotes-room-pwa.git"
  },
  "keywords": [
    "quotes"
  ],
  "author": "Jevona Magdalena",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/RainbowJM/the-quotes-room-pwa/issues"
  },
  "homepage": "https://github.com/RainbowJM/the-quotes-room-pwa#readme",
  "dependencies": {
    "axios": "^1.3.4",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "express-minify-html": "^0.12.0",
    "request": "^2.88.2"
  },
  "devDependencies": {
    "gulp-rev": "^10.0.0",
    "nodemon": "^2.0.21",
    "npm-run-all": "^4.1.5",
    "uglify-js": "^3.17.4",
  }
}

```

#### Build tools
##### Uglify.js
One build tool that we use as compressor is Uglify.js

To install this tool you have to do the following:
```
npm install uglify-js
```
To save it in the devDependencies do as follow:
```
npm install uglify.js --save-dev
```
An now you can use it to compress the files that you want. As this application continues to develop this tool will be ready handy. 
That is why we will set it up now so that in the future it can be used.

Uglify has its own command line options:
- -h, --help - Print usage information
- -c, --compress - Enable compressor/specify compressor options
- -m, --mangle
- -o, --output - Minimize the file

The following scripts can be used to compress the file `.js` you want.
In the future of the development of the application, that maybe will add a client-side to the application
That contains `.js`, can use Uglify to minimize the file, and help with the performace of the application

##### Npm-run-all
Sometimes you need to run a fake API with server, that means you will have to run multiple script at the same time.
`npm-run-all` helps you, to make it easier to run everything

To install it you have to do the following to add it to your `package.json` and in de `devDepencies`:
```
npm install npm-run-all --save-dev
```

When you have done this you then add the script in your `package.json`, that will take care of running it for you
```javascript
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "all": "npm-run-all --parallel serve api",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
### Express
For de server side of the application, we used the library Express.
To install it you can use npm
```
npm install express
```

### EJS
For this application the template engine that is used is EJS.
It will take care of the rendering of the static pages

To install the template you will have to do the following
```
npm install ejs
```
In the server you have to tell it where what template is used
This you do by adding the following in the `app.js`, the method `app.set()`
And for the static file like the stylesheet, img you have to use de static express middleware
Als you have to indicate that this is in the public file

```javascript
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.static('public'));
app.use(express.static('assets'));
```

### Nodemon
This package is life saver it makes it more easier, so that you don't have to restart your server each time you add/edit something in your code. It will take care of this for you.

By using the script options in the `package.json` you can make different script that you can then run by using a shorter command in your terminal

```javascript
 "scripts": {
    "start": "nodemon app.js",
    "dev": "node app.js"
  },
  ```
## Server
To start the server use
```
npm start
```
The structure of the server you will find in the file `app.js`
``` javascript
const express = require('express');
const app = express();
const port = 3000;
```
To import 'Express' you have to use 'require()' method

The localhost port in this case is `3000`, this is where the server will be running.
For all of this you have to have your application knowing where it should be listening to.
This part you can do by adding the following code in your `app.js`

```javascript
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

## Routing
For the routing part of the application, we use a general routing first in the `app.js`.
``` javascript
app.METHOD(PATH,HANDLER)
```

``` javascript
var quotesRouter = require('./routes/quotes');
app.use('/', quotesRouter);
```
That calls the rest of the routing in the file `quotes.js`

In the file `quotes.js` you will find the following variables:
``` javascript
const express = require('express');
const request = require('request');
const axios = require('axios');
const url = 'https://opensheet.elk.sh/1p7Wnace8KpaIFnATpBcil_KyJ4P8IC8vYIUO8NCfcKc/Quotes';
const router = express.Router();
```
`express.Router()` is the method that will take care of the routing of the application.


## Pages
### Overview page
For the overview page 
```javascript 
router.get('/', function(req, res) {
	request(url, {json: true}, function (err, requestRes, body){
		if (err) {
			res.send(err);
		} else {
			res.render('quotes', {
				title: 'Home', 
				data: body
			});
		}
	});
});
```
The routing will render teh request made on `localhost`, and render the HTML that was made using EJS

## Source
- [Compressor](https://github.com/mishoo/UglifyJS)
- [Uglify](https://www.npmjs.com/package/uglify-js)
- [Ms](https://www.npmjs.com/package/ms)
- [Express-minify-html](https://www.npmjs.com/package/express-minify-html)
- [Express](https://expressjs.com/en/api.html#express)
