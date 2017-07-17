import React from 'react';
import ajax from 'superagent';
import { Link } from 'react-router-dom';

class Detail extends React.Component {

	constructor(props) {
		super();
		this.state = {
			mode: 'commits',
			commits: [],
			forks: [],
			pulls: []
		}
	}

	fetchFeed(type) {
		const baseURL = 'https://api.github.com/repos/facebook';
    ajax.get(`${baseURL}/${this.props.match.params.repo}/${type}`)
        .end((error, response) => {
            if (!error && response) {
                this.setState({ [type]: response.body });
            } else {
                console.log(`Error fetching ${type}`, error);
            }
        }
    );
	}

	componentWillMount() {
			this.fetchFeed('commits');
			this.fetchFeed('forks');
			this.fetchFeed('pulls');
	}

	showSection(section) {
		this.setState({
				mode: section
		});
	}

  render() {
        return (
        	<div>
						<h3>What do you want to see?</h3>
						<div className="ui buttons">
						  <button className="ui button" onClick={() => this.showSection('commits')}>Commits</button>
						  <button className="ui button" onClick={() => this.showSection('forks')}>Forks</button>
						  <button className="ui button" onClick={() => this.showSection('pulls')}>Pulls</button>
						</div><br/><br/>
						{this.state.mode == 'commits' &&
							<div>
								<h5 className="ui top attached header">
								  Commits history
								</h5>
								<div className="ui attached segment">
									<div className='ui bulleted list'>
				        	{
						        	this.state.commits.map((commit, index) => (
								        	<div className="item" key={index}>
								        		<Link to={"/user/" + commit.author.login}><b>{commit.author ? commit.author.login : 'Anonymous'}</b></Link>:
								        		<a href={commit.html_url}> {commit.commit.message}</a>
								        	</div>
								    	))
									}
				        	</div>
								</div>
							</div>
						}

						{this.state.mode == 'forks' &&
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

						{this.state.mode == 'pulls' &&
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
						<br/>
						<Link to="/">
							<button className="ui labeled icon button">
						    <i className="left chevron icon"></i>
						    Back
						  </button>
						</Link>
        	</div>
		);
  }
}

export default Detail;
