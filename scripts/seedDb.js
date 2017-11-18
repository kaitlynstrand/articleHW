const mongoose = require('mongoose');
const db = require('.../models');
mongoose.Promise = global.Promise;

mongoose.connect(
	process.env.MONGO_URI || 'mongodb://localhost/reactnewsies',
	{
		useMongoClient: true
	}
);

const articleSeed = [
	{
		title: "Article About Politics",
		date: new Date(Date.now()),
		url: "http://nytimes.com/article1"
	},
	{
		title: "Modern Love",
		date: new Date(Date.now()),
		url: "http://nytimes.com/article2"
	},
	{
		title: "What's going on in theater",
		date: new Date(Date.now()),
		url: "http://nytimes.com/article3"
	}
];

db.Article
	.remove({})
	.then(() => db.Article.collectioin.insertMany(articleSeed))
	.then(data => {
		console.log(data.insertedIds.length + " articles inserted!");
		process.exit(0);
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});