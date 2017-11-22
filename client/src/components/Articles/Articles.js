var React = require('react');

var helper = require('../../utils/helper');

class Articles extends Component {
	state = {
		articles: [],
		title: "",
		web_url: ""
	};

	handleSave = article =>  {
		helper.postSaved(article).then(function(response) {
			console.log('Saved Article');
		}.bind(this));
	};

	render = () => {
		return(

			<div className='panel card z-depth-4 center-align'>
				<h3 className='panelTitle'>Articles</h3>

			<div className='resultBox'>
				{this.props.articles.map(function(article, i) {
					return(
						<li key={article._id}>
							<strong><a href={article.web_url} className='left-align' target='_blank'>{article.title}</a></strong>
								<i>{article.date.substring(0,10)}</i>
							<span>
								<button className='waves-effect waves-light btn right-align' onClick={this.handleSave(article)} value={article._id}>Save</button>
							</span>
						</li>
				);
			})}
			<h5 className='left-align'>{this.props.articles}</h5>
			<button className='waves-effect waves-light btn right-align'>Save</button>
			</div>
			</div>
	)
	}
};

module.exports = Articles
