const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/', function(req, res) {
	request('https://opensheet.elk.sh/1p7Wnace8KpaIFnATpBcil_KyJ4P8IC8vYIUO8NCfcKc/Quotes', {json: true}, function (err, requestRes, body){
		if (err) {
			res.send(err);
		} else {
            console.log("hello")
			res.render('index', {
				title: 'Home', // We use this for the page title, see views/partials/head.ejs
				data: body
			});
		}
	});
});

// Create a route for our detail page
// router.get('/quotes/:id', function(req, res) {
// 	request(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`, {json: true}, function (err, requestRes, body){
// 		if (err) {
// 			// We got an error
// 			res.send(err);
// 		} else {
// 			// Render the page using the 'post' view and our body data
// 			res.render('post', {
// 				title: `Post ${req.params.id}`, 
// 				postData: body
// 			});
// 		}
// 	});
// });

module.exports = router;