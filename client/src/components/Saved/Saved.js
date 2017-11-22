var React = require('react');

var helper = require('../../utils/helper');

var Saved = React.createClass({

	handleDelete: function(article) {
		var articleId = article.target.value;

		helper.deleteSaved(articleId).then(function(response) {
			console.log('Deleted Article');
		}.bind(this));
	},

	render: function() {
		return (
			<div className='panel card z-depth-4 center-align'>
				<h3 className='panelTitle'>Saved</h3>	

			<div>
			{this.props.saved.map(function(article, i) {
				return (
					<li key={article._id}>
						<strong><a href={article.web_url} className='left-align' target='_blank'>{article.title}</a></strong>
							<i> {article.pub_date.substring(0,10)}</i>
						<span>
							<button className='waves-effect waves-light btn right-alight' onClick={this.handleDelete} value={article._id}>Remove</button>
						</span>
					</li>
				);
			})}
			</div>
			</div>
		);
	}
});

module.exports = Saved;