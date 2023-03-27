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

module.exports = router;