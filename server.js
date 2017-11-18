const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./models');
const {Article} = db;
console.log(db.Article);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//need to figure out what this is???
app.use(express.static('client/build'));
app.use(routes);

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/articleHW",
  {
    useMongoClient: true
  }
);


app.listen(PORT, function() {
	console.log("Now Listening on PORT" + PORT)
});


// article.post('/api/saved', (req, res) => {
// 	console.log(req.body)
// Article.create(req.body).then(() => {
// 	res.json("heyhey")
// })
// })