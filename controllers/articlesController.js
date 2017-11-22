var express = require('express');
var router = express.Router();
var path = require('path');

const db = require('../models');

router.get('/', function(req, res) {
	res.sendFile(__dirname + "../public.index.html");
});

router.get('/api/saved', function(req, res) {
	Article.findAll({}).sort([
		['date', 'descending']
	]).limit(5).exec(function(err, doc) {
		if (err) {console.log(err);}
		else {res.send(doc);}
	});
});

router.post('/api/saved', function(req, res) {
	Article.create({
		title: req.body.title,
		date: Date.now(),
		url: req.body.url
	}, function(err) {
		if(err){console.log(err);}
		else{res.send("Article is Saved");}
	});
});

router.delete('/api/saved/:id', function(req, res) {
	Article.findByIdAndRemove({ _id: req.params.id }, function(err, doc) {
		if(err){console.log(err);}
		else(res.redirect();}
	});
});

module.exports = router;
