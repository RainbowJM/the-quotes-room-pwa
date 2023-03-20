const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Setup the template engine ejs
// app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.static('assets'))
// app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use('/static', express.static(path.join(__dirname, 'assets')))


app.get('/', function(req, res) {
    res.render('pages/index')
})
app.get('/about', function(req, res){
  res.render('pages/about')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})