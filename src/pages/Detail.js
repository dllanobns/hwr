import React from 'react';
import ajax from 'superagent';

class Detail extends React.Component {

	constructor(props) {
		super();
		this.state = {
			commits: [],
			forks: [],
			pulls: [],
			commits_flag: true,
			forks_flag: false,
			pulls_flag: false
		}
	}

	componentWillMount() {
	    ajax.get('https://api.github.com/repos/facebook/react/commits')
	        .end((error, response) => {
	            if (!error && response) {
	                this.setState({ commits: response.body });
	            } else {
	                console.log('There was an error fetching from GitHub', error);
	            }
	        }
	    );
			ajax.get('https://api.github.com/repos/facebook/react/forks')
	        .end((error, response) => {
	            if (!error && response) {
	                this.setState({ forks: response.body });
	            } else {
	                console.log('There was an error fetching from GitHub', error);
	            }
	        }
	    );
			ajax.get('https://api.github.com/repos/facebook/react/pulls')
	        .end((error, response) => {
	            if (!error && response) {
	                this.setState({ pulls: response.body });
	            } else {
	                console.log('There was an error fetching from GitHub', error);
	            }
	        }
	    );
	}

  render() {
        return (
        	<div>
						<h3>What do you want to see?</h3>
						<div className="ui buttons">
						  <button className="ui button">Commits</button>
						  <button className="ui button">Forks</button>
						  <button className="ui button">Pulls</button>
						</div><br/><br/>
						{this.state.commits_flag &&
							<div>
								<h5 className="ui top attached header">
								  Commits history
								</h5>
								<div className="ui attached segment">
									<div className='ui bulleted list'>
				        	{
						        	this.state.commits.map((commit, index) => (
								        	<div className="item" key={index}>
								        		<b>{commit.author ? commit.author.login : 'Anonymous'}</b>:
								        		<a href={commit.html_url}>{commit.commit.message}</a>
								        	</div>
								    	))
									}
				        	</div>
								</div>
							</div>
						}

						{this.state.forks_flag &&
							<div>
								<h5 className="ui top attached header">
								  Forks history
								</h5>
								<div className="ui attached segment">
									<div className='ui bulleted list'>
				        	{
						        	this.state.forks.map((fork, index) => (
								        	<div className="item" key={index}>
								        		<b>Fork ID:</b> {fork.id}. <a href={fork.forks_url}>{fork.forks_url}</a>
								        	</div>
								    	))
									}
				        	</div>
								</div>
							</div>
						}

						{this.state.pulls_flag &&
							<div>
								<h5 className="ui top attached header">
								  Pulls history
								</h5>
								<div className="ui attached segment">
									<div className='ui bulleted list'>
				        	{
						        	this.state.pulls.map((pull, index) => (
								        	<div className="item" key={index}>
								        		<b>{pull.title}:</b> <a href={pull.url}>{pull.url}</a>
								        	</div>
								    	))
									}
				        	</div>
								</div>
							</div>
						}
        	</div>
		);
  }
}

export default Detail;
