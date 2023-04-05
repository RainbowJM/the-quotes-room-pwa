# Progressive Web Apps - The Quote Room

![Screenshot 2023-04-05 at 22 12 06](https://user-images.githubusercontent.com/59873140/230198964-d7a07dda-6ab2-4ba8-b6a3-bafd5c4388d9.png)

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Server](#server)
- [Routing](#routing)
- [Pages](#pages)
- [PWA](#progressive-web-app)
- [Online](#online)
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
    "test": "echo \"Error: no test specified\" && exit 1",
    "minify:script": "uglifyjs app.js -c -m -o script.min.js"
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
```json
 "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "all": "npm-run-all --parallel serve api",
    "test": "echo \"Error: no test specified\" && exit 1",
    "minify:script": "uglifyjs app.js -c -m -o script.min.js"
  },
```

#### Express-minify-html
``` javascript
const minifyHTML = require('express-minify-html');
 app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));
```
### Express
For the server side of the application, we used the library Express.
To install it you can use npm
```
npm install express
```
All the logic of the server you will find in the file `app.js`. 

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

### Axios
To install axios you can use the following:
```
npm install axios
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
```javascript
const express = require('express');
const request = require('request');
const axios = require('axios');
const url = 'https://opensheet.elk.sh/1p7Wnace8KpaIFnATpBcil_KyJ4P8IC8vYIUO8NCfcKc/Quotes';
const router = express.Router();
```
`express.Router()` is the method that will take care of the routing of the application.

## Pages
### Overview page
<img width="1510" alt="Screenshot 2023-04-05 at 22 18 07" src="https://user-images.githubusercontent.com/59873140/230200172-fceaf856-eb1a-457a-973d-5c68fbae25b3.png">

For the overview page, contains the general information. 
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

The HTML with the EJS template `quotes.ejs`
As you can see the route for this one is `/quotes`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <%- include('./partials/head'); %>
</head>

<body>
    <header>
        <%- include('./partials/header'); %>
    </header>

    <main id="quotes">
        <% data.forEach( (quote)=> { %> 
            <section>
                <div class="title-box">
                    <span><%-quote.authorId%></span>
                    <h2><a href="/quotes/<%- quote.id%>"><%-quote.author%></a></h2>
                    <hr />
                    <p><%-quote.bio%></p>
                </div>
            </section>
        <%}) %>
    </main>

    <footer>
        <%- include('./partials/footer'); %>
    </footer>
</body>

</html>
```
### Details page
<img width="1512" alt="Screenshot 2023-04-05 at 22 18 31" src="https://user-images.githubusercontent.com/59873140/230200270-62d0a1d0-4e84-4a67-bc46-77ee860ce111.png">

Here you will get the quote based on the actor, this is based on the route `quotes/:id`
```javascript
router.get('/quotes/:id', function(req, res) {
    const id = req.params.id
    let quotes;
    let quote;
    axios.get(url)
    .then(function(response) {
        quotes = response.data;
        quote = quotes.find(quote => quote.id === id);

        if (quote !== null){
            res.render('quote', {
                data: quote
            });
        }
    });
});
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <%- include('./partials/head'); %>
</head>

<body>
    <header>
        <%- include('./partials/header'); %>
    </header>

    <main id="quote">
        <section>
            <div class="title-box">
                <span>
                    <%- data.authorId%>
                </span>
                <h2>
                    <%- data.author%>
                </h2>
                <hr />
                <p>
                    <%- data.bio%>
                </p>
            </div>
            <div class="info">
                <q>
                    <%- data.quote%>
                </q>
            </div>
        </section>
    </main>

    <footer>
        <%- include('./partials/footer'); %>
    </footer>
</body>

</html>
```
For this one you can see `axios` was used for this part.
With `axios.get()` data based on the URL.
The data that is return, will be filtered based on the `id` and then it returns the data

### Offline page
<img width="649" alt="Screenshot 2023-04-05 at 22 24 53" src="https://user-images.githubusercontent.com/59873140/230202348-13addf3f-d71e-4c13-971e-1f34762063b3.png">

This is the page the user will get when the network is offline.
The route is `/offline`

```javascript
router.get('/offline', function(req, res) {
	request(url, {json: true}, function (err, requestRes, body){
		if (err) {
			res.send(err);
		} else {
			res.render('offline', {
				title: 'Home offline', 
				data: body
			});
		}
	});
});
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <%- include('./partials/head'); %>
</head>

<body>
    <header>
        <%- include('./partials/header'); %>
    </header>

    <main>
        <section>
            <div class="title-box">
                <h2>
                    Check network!
                </h2>
                <hr />
                <p id="offline">
                    Going offline for some days is like a new world you're checking in..
                </p>
            </div>
        </section>
    </main>

    <footer>
        <%- include('./partials/footer'); %>
    </footer>
</body>

</html>
```

### About page
The route for this page is `/about`, this is more a short description of the application.
```javascript
router.get('/about', function(req, res) {
	res.render('about', {
		title: 'About',
		data: 'The Quotes Room is a single page application, where you get all the quotes that you need'
	})
});
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <%- include('./partials/head'); %>
</head>
<body>
    <header>
        <%- include('./partials/header'); %>
    </header>

    <main>
        <section id="about">
            <div class="title-box">
                <h3>About</h3>
                <hr/>
                <p>Jevona Magdalena</p>
            </div>
            <div id="quote-about">
                <q>
                    <%- data%>
                </q>
            </div>
            <h4></h4>
            <footer>
                <span>© 2023 Creator of The Quotes Room</span>
            </footer>
        </section>
    </main>
</body>
</html>
```

## Progressive Web App
After having having the main logic of the applicatoion down, it's time to make it a progressive web application.

This means that the web application has been designed to be capable, reliable and installable. These three pillars transform them into an experience that feels like a platform-specific application.

All of this will give the application some advantage like:
- Works fast
- Can use the application offline
- Can download the application as a app on you phone or desktop
- You get notifications

### Requirements
The requirements of a PWA application:
- HTTPS
- Service Worker
- Manifest

#### Service Worker
<img width="1512" alt="Screenshot 2023-04-05 at 11 10 59" src="https://user-images.githubusercontent.com/59873140/230036527-d8e19bc6-d4b1-4e39-b1f1-ad805809b8ce.png">

In Dev tools you can see in the tab application the information of the service worker and manifest

##### Job Story
> When I am in the train and do not have a good internet connection, I still want to see the list of quotes so that I can still get inspiration for my school projects on the go.

Service worker act as a proxy server between the Web application, the browser and the network with connection

Task:
- Creating a good offline experience.
- Watch request and response between server and client.
- Provide access to push notifications.

In the root of the appliction, in this case in the `public` folder you will find the file `service-worker.js`

To register the service worker, so that the browser knows about it. 
For the registration part you can find it in `footer.ejs`

```html
<script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
          .then(function(registration) {
            console.log('service worker registered', registration)
            return registration.update();
          })
          .catch(error => console.log('service worker not registered', error))
      });
    }
</script>
```
A server is event-based. It consists of three events.
- Install event
- Activate event 
- Fetch event 

The install event, takes care of the installation part of the server worker. 
This is also where the precaching takes place. 
During this step, the application is preparing to make everything available for use offline.

```javascript
self.addEventListener('install', event => {
    console.log('Installed service worker');

    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                cache.addAll(assets)
                    .then(() => self.skipWaiting());
            })
    );
});
```
When the `install` handler completes, the service worker is considered installed.

The activate event, is where the service worker is activated.
The point where this event fires is generally a good time to clean up old caches and other things associated with the previous version of your service worker. 

```javascript
self.addEventListener('activate', event => {
    console.log('Activating service worker')
    event.waitUntil(
        caches.keys()
            .then(names => {
                return Promise.all(names
                    .filter(name => name !== cacheName && name !== runtimeCacheName)
                    .map(key => caches.delete(key)))
            })
    )
});
```
And finally you have the fetch event. In this event the stored data is fetched and rendered on the page or returned to the offline fallback page.

```javascript
self.addEventListener('fetch', event => {
    console.log('Fetch event: ', event.request.url);
    if (isCoreGetRequest(event.request)) {
        event.respondWith(
            caches.open(cacheName)
                .then(cache => cache.match(event.request.url))
        );
    } else if (isHtmlGetRequest(event.request)) {
        event.respondWith(
            caches.open(runtimeCacheName)
                .then(cache => cache.match(event.request.url))
                .then(response => response ? response : fetchAndCache(event.request, runtimeCacheName))
                .catch(e => {
                    return caches.open(cacheName)
                        .then(cache => cache.match('/offline'))
                })
        );
    }
});

function isCoreGetRequest(request) {
    return request.method === 'GET' && assets.includes(getPathName(request.url));
}

function isHtmlGetRequest(request) {
    return request.method === 'GET' && 
    (request.headers.get('accept') !== null && request.headers.get('accept').indexOf('text/html') > -1);
}

function fetchAndCache(request, cacheName) {
    return fetch(request)
        .then(response => {
            if (!response.ok) {
                throw new TypeError('Bad response status');
            }
            const clone = response.clone();
            caches.open(cacheName).then((cache) => cache.put(request, clone));
            limitCacheSize(cacheName,5);
            return response;
        })
}

function getPathName(requestUrl) {
    const url = new URL(requestUrl);
    return url.pathname;
}
```

There is also a part where cleans the run time cache

```javascript 
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size){
                cache.delete(keys[0].then(limitCacheSize(name,size)));
            }
        });
    });
};
```

#### Manifest
The manifest is a `.json` file, it has information of your application that is needed for PWA

In the root/public of the application is were the `manifest.json` will is.

The manifest consist of the following:
- `name`
- `short_name`
- `theme_color`
- `background_color`
- `display`
- `scope`
- `start_url`
- `manifest_version`
- `orientation`
- `icons`

```json
{
    "name": "The Quote Room",
    "short_name": "The Quote Room",
    "theme_color": "#BBC2FF",
    "background_color": "#FFFFFF",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "manifest_version": 2,
    "orientation": "portrait-primary",
    "icons": [
        {
            "src": "/img/Quotes room.png",
            "type": "image/png",
            "sizes": "500x500"
        },  
        {
            "src": "/img/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },  
        {
            "src": "/img/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
        },
        {
            "src": "/img/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
        },
        {
            "src": "/img/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```

To make the connection of your manifest you have to loink it in your HTML page.

```html
<link rel="manifest" href="/manifest.json">
```
<img width="1512" alt="Screenshot 2023-04-05 at 11 10 59" src="https://user-images.githubusercontent.com/59873140/230209165-ebdbaf6d-762c-41bc-872e-e6be1b752cd9.png">

#### Activity Flow

![Screenshot 2023-04-05 at 21 54 04](https://user-images.githubusercontent.com/59873140/230202824-2a2fbc64-7199-4707-a402-7530e2be48ea.png)

This is the activity diagram for the service worker. 
The diagram consists of the flow of the application. 
The url endpoints of the applications. 
At the bottom you have the control flow so the main part of the activity diagram. 

## Critical Rendering Path
The critical rendering path refers to the process of rendering a Web page in the browser. 
From the time the user enters a URL until the page is fully loaded. 
Optimizing the critical rendering path is important because it affects the load time of a page, which in turn can affect user experience and search engine ranking.

To optimize the critical rendering path, there are several techniques and best practices that can be implemented. 

Some examples include:
- Code Minimization
- Compress files
- Cache control

To test the performace of the applaction you can use lighthouse or check the timespan in the network tab
<img width="218" alt="Screenshot 2023-04-03 at 12 11 09" src="https://user-images.githubusercontent.com/59873140/230210187-134652f6-85f2-461a-ba2f-758bc2a2a509.png">

### Loading speed
<img width="1352" alt="Screenshot 2023-04-03 at 13 51 35" src="https://user-images.githubusercontent.com/59873140/230208956-056341e3-bb2e-4c50-bc28-6d66328fb855.png">

<img width="1352" alt="Screenshot 2023-04-03 at 13 53 22" src="https://user-images.githubusercontent.com/59873140/230209044-26f6f4a0-b462-470e-bbd6-c772cd946c09.png">

### CSS minimization
Minimize cssyou can do it by using a plugin from vscode. 
But the plugin is the same as the build tool from uglifyjs. 
What this does is it takes out all the whitespace and puts all the css properties on one line.
See the before and after below
<img width="737" alt="Screenshot 2023-04-03 at 15 01 24" src="https://user-images.githubusercontent.com/59873140/230209771-e20d3a4d-c385-40d3-ac22-5fd580bb2363.png">

<img width="738" alt="Screenshot 2023-04-03 at 15 02 46" src="https://user-images.githubusercontent.com/59873140/230209794-052c00ec-549a-4abc-a07b-7f4df6b04660.png">

### HTML minimization

![Screenshot 2023-04-05 at 22 55 55](https://user-images.githubusercontent.com/59873140/230209553-b3c56826-12ef-413c-85f9-84cb2afd9abf.png)

<img width="738" alt="Screenshot 2023-04-03 at 15 17 00" src="https://user-images.githubusercontent.com/59873140/230209374-97d6ffa6-4b2a-42f1-a0bc-86b43365375e.png">

```javascript
const minifyHTML = require('express-minify-html');

app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));
```

### Lighthouse
The extension lighthouse you can test the accessibility of your application and also your PWA of your application.

See the before and after below
![Screenshot 2023-04-05 at 23 00 05](https://user-images.githubusercontent.com/59873140/230210371-e2db4f1e-398b-42e6-98b1-48c0b824c15e.png)

![Screenshot 2023-04-05 at 22 50 48](https://user-images.githubusercontent.com/59873140/230208540-e04a5f4d-b242-421d-982d-83cf23ae91c1.png)

### Cache control
Caching control is a method used to manage the cache settings of a Web page or other file on a Web server.
When a browser visits a Web page, a copy of the page is stored in the browser's cache to speed up the load time of future visits to that page

It's not recommened to cache your html, because that is where all your call are.
But caching your css is highly recommened

By default a website doesn't cache, you have to set it up by doing the following:
```javascript
let options = {
  maxAge: '2y',
  etag: false
}

app.use(express.static('public', options));
```

## Online
The last part for this assignment is putting the app online. 
To host the application railway app was used.
With railway you can link your github account and every time you commit it will also updated on railway.

![Screenshot 2023-04-05 at 22 46 36](https://user-images.githubusercontent.com/59873140/230207661-a005a89c-25d7-4ca7-b81b-1ec2c753a099.png)

Set up railway for hosting:
- Npm Script in your `package.json` should be `" start": "node app.js"`
- Create Railway account with your github account
- Set up your setting
- Choose repository
- Create new project
- Generate domain name 
- At Variable add the PORT and PORT NUMBER

## Source
- [Compressor](https://github.com/mishoo/UglifyJS)
- [Uglify](https://www.npmjs.com/package/uglify-js)
- [Ms](https://www.npmjs.com/package/ms)
- [Express-minify-html](https://www.npmjs.com/package/express-minify-html)
- [Express](https://expressjs.com/en/api.html#express)
