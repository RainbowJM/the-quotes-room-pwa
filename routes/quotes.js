const express = require('express');
const request = require('request');

const router = express.Router();

// Overview page
router.get('/', function(req, res) {
	request('https://opensheet.elk.sh/1p7Wnace8KpaIFnATpBcil_KyJ4P8IC8vYIUO8NCfcKc/Quotes', {json: true}, function (err, requestRes, body){
		if (err) {
			res.send(err);
		} else {
			res.render('quotes', {
				title: 'Home', 
				data: body
			});
            // console.log(body);
		}
	});
});

// Detail page
router.get('/quotes/:id', function(req, res) {
	request(`https://opensheet.elk.sh/1p7Wnace8KpaIFnATpBcil_KyJ4P8IC8vYIUO8NCfcKc/Quotes/${req.params.id}`, {json: true}, function (err, requestRes, body){
		if (err) {
			res.send(err);
		} else {
			// Render the page using the 'post' view and our body data
			res.render('quote', {
				title: `Quote ${req.params.id}`, 
				data: body
			});
            console.log(body)
		}
	});
});

module.exports = router;