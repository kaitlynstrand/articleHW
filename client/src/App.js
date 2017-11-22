// Require React
var React = require('react');

// bringing in subcomponents
var Articles = require('./components/Articles');
var Saved = require('./components/Saved');
var Search = require('./components/Search');

// Requiring our helper for API calls
var helper = require('./utils/helper');

// creating Main Component
var App = React.createClass({
  // set initial state
  getInitialState: function(){
    return{
      search: ["","",""],
      articles: [],
      saved: []
    };
  },

  // loads when page is ready
  componentDidMount: function(){
    // using helper to get saved articles
    helper.getSaved().then(function(response){
      console.log(response);
      if (response !== this.state.saved) {
        console.log("Saved", response.data);
        this.setState({ saved: response.data });
      }
    }.bind(this));
  },
  // updating as changes occur
  componentDidUpdate: function(){
    // run query
    helper.runQuery(this.state.search).then(function(data){
      if(data !== this.state.articles) {
        console.log("Articles", data);
        this.setState({ articles: data });
        // then post results to history
        helper.postSaved(this.state.search).then(function(){
          console.log("Updated");
          // then get updated history
          helper.getSaved().then(function(response){
            console.log("Saved", response.data);

            this.setState({ saved: response.data });

          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  },
  // lets children update parent
  setSearch: function(topic, startYear, endYear){
    this.setState({ search: [topic, startYear, endYear] });
  },
  // render the function
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div className="card-panel z-depth-4 panelTitle center-align">
            <h2>New York Times</h2>
            <h4>Search for an article!</h4>
          </div>
        </div>

        <div className="row col s12">
          <Search search={this.setSearch} />
        </div>

        <div className="row col s12">
          <Articles articles={this.state.articles} />
        </div>

        <div className="row col s12">
          <Saved saved={this.state.saved} />
        </div>

      </div>
    );
  }
});

module.exports = App;
