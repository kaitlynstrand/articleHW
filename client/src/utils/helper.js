import axios from 'axios';

var helper = {
  runQuery: function(topic, startYear, endYear) {

var APIkey = "5a11cac182794981a3d2da27738f97d4"
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + APIkey + "&q="+ topic + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "1231";

    return axios.get(queryURL).then(function(response) {

      if (response.data.response.docs.length > 0) {
        var articles = [];

        for (var i = 0; i < 5; i++) {
          var doc = response.data.response.docs[i];
          var articleID = doc._id;
          var article = {
            title: doc.headline.main,
            url: doc.web_url,
            date: doc.pub_date.split('T')[0],
            articleID: articleID
          };

          articles.push(article);
        }
        return articles;
      } else {
        return false;
      }
    });
  },

  getSaved: function() {
    return axios.get('/api/saved');
  },

  postSaved: function(article) {
    return axios.post('/api/saved', {title: article.title, date: article.pub_date, url: article.web_url});
  },

  deleteSaved: function(id) {
    return axios.delete('api/saved/' + id);
  }
};

export default helper;



