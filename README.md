# Progressive Web Apps - The Quote Room

<img width="1352" alt="Screenshot 2023-03-06 at 11 49 07" src="https://user-images.githubusercontent.com/59873140/226754427-3d3cda39-a5cf-4271-9845-4a7c570b2ddc.png">

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Server](#server)
- [Template](#template)
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

```
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
    "start": "nodemon app.js",
    "dev": "node app.js"
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
    "nodemon": "^2.0.21",
    "request": "^2.88.2"
  }
}
```

### Express
For de server side of the application, we used the library Express.
To install it you can use npm
```
npm install express
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

## Template


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
## Pages
## Source
