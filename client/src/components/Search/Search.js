import React, { Component } from 'react';
import helper from './../../utils/helper';

class Search extends Component {
	reloadPage = () => {
		return {
			topic: "",
			startYear: "",
			endYear: ""
		};
	}

	handleTopicChange = event => {
		this.setState({ topic: event.target.value });
	}

	handleStartChange = event => {
		this.setState({ startYear: event.target.value });
	}

	handleEndChange = event => {
		this.setState({ endYear: event.target.value });
	}

	handleSubmit = event => {
		event.preventDefault();

		helper.runQuery({
			topic: this.state.topic,
			startYear: this.state.startYear,
			endYear: this.state.endYear
		})	
        .then(res => this.render())
        .catch(err => console.log(err));

    }
	
	render = () => {
		return(
			<div className='card z-depth-4 center-align'>
				<h3 className='panelTitle'>Search</h3>
				<form className='card-panel' onSubmit={this.handleSubmit}>
					<div className='input-field'>
						<input type='text' placeholder='Topic (required)' id='topic' onChange={this.handleTopicChange} className='validate' required></input>
					</div>
					<div className='input-field'>
						<input type='number' maxLength='4' placeholder='Start Year (required)' onChange={this.handleStartChange} className='validate' required></input>
					</div>
					<div className='input-field'>
						<input type='number' maxLength='4' placeholder='End Year (required)' onChange={this.handleEndChange} className='validate' required></input>
					</div>
					<br></br>
					<button className='waves-effect waves-light btn' type='submit'>Submit</button>
				</form>
			</div>
		);
	}
};

export default Search;