import axios from 'axios';

export const helper = (props) => {
  const runQuery = (topic, startYear, endYear) => {
    //NYT API key
    var APIkey= '5a11cac182794981a3d2da27738f97d4';
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + APIkey + '&q='+ topic + '&begin_date=' + startYear + '0101' + '&end_date=' + endYear + '1231'"
    
    return axios.get(queryURL).then(function(response) {
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
    }
  }

  getSaved = () => {
    return axios.get('/api/saved');
  }
  postSaved = article => {
    return axios.post('/api/saved', {title: article.title, date: article.date, url: article.url});
  }
  deleteSaved = id => {
    return axios.delete('api/saved/' + id);
  }
}

runQuery: function(topic, startYear, endYear) {

    var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

    var qs = '?api-key=5a11cac182794981a3d2da27738f97d4' + topic; 

    if (startYear) {
      qs += '&begin_date=' + startYear + '0101';
  
    }

    if (endYear) {
      qs += '&end_date=' + endYear + '1231';
    }

    return axios.get(queryURL + qs).then(function(articles) {

      if (articles.data.articles.docs.length > 0) {
        var articles = [];

        for (var i = 0; i < 5; i++) {
          var doc = articles.data.articles.docs[i];
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

