const express = require('express');
const request = require('request');
const axios = require('axios');
const url = 'https://opensheet.elk.sh/1p7Wnace8KpaIFnATpBcil_KyJ4P8IC8vYIUO8NCfcKc/Quotes';
const router = express.Router();

// Overview page
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

// Detail page
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

// Offline page
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

// About page
router.get('/about', function(req, res) {
	res.render('about', {
		title: 'About',
		data: 'The Quotes Room is a single page application, where you get all the quotes that you need'
	})
})

module.exports = router;