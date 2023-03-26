const express = require('express');
const app = express();
const port = 3000;

// Setup the template engine ejs
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.static('public'));
app.use(express.static('assets'));

var quotesRouter = require('./routes/quotes');
app.use('/', quotesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})