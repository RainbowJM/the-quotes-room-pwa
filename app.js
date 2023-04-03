const express = require('express');
const app = express();
const port = 3000;
let options = {maxAge: '2y',
etag: false}

// Setup the template engine ejs
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.static('public', options));
app.use(express.static('assets'));

var quotesRouter = require('./routes/quotes');
app.use('/', quotesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})