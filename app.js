const express = require('express');
const app = express();
const port = 3000;

// Setup the template engine ejs
app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index')
})
app.get('/', function(req, res){
  res.render('pages/about')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})