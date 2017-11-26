const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./models');
const {Article} = db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//need to figure out what this is???
app.use(express.static('client/build'));
app.use(routes);
app.use(cors);

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactnewsies",
  {
    useMongoClient: true
  }
);
/** routes */
app.post("/api/saved", (req, res) => {
  // get the posted object
  var article = req.body

  // call Article.create
  // then return some json (success|error)
  Article.create(article)
  .then(() => {
    res.json(article)
  })
  .catch((err) => {
    res.json(err)
  })
})

app.get('/api/saved', (req, res) => {
  Article.find({}).then(articles => res.json(articles))
})
/** routes*/
// app.post('/api/saved', (req, res) => {
// //get the posted object 
// var article = req.body
// console.log(article)
// //call Article.create

// //then return some json (success|error)
// })/** end  routes*/

app.listen(PORT, function() {
	console.log("Now Listening on PORT" + PORT)
});


// article.post('/api/saved', (req, res) => {
// 	console.log(req.body)
// Article.create(req.body).then(() => {
// 	res.json("heyhey")
// })
// })