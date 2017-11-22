var axios = require('axios');

var helper = {
  runQuery: function(topic, startYear, endYear){
    //NYT API key
    var APIkey= '5a11cac182794981a3d2da27738f97d4';
    var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + APIkey + '&q='+ topic + '&begin_date=' + startYear + '0101' + '&end_date=' + endYear + '1231';
    return axios.get(queryURL).then(function(response){
      var articles = [];
      // if there is a result, return it formatted properly
      if (response.data.results[0]) {
        for(var i = 0; i < 5; i++) {
          articles.push(response.data.articles[i].formatted);
        }
        return articles;
      } else {
        // if no results
        return 'No Articles Found';
      }
    });
  },
  getSaved: function(){
    return axios.get('/api/saved');
  },
  postSaved: function(article){
    return axios.post('/api/saved', {title: article.title, date: article.date, url: article.url});
  },
  deleteSaved: function(id){
    return axios.delete('api/saved/' + id);
  }
};

module.exports = helper;