import React from 'react';
import { Link } from 'react-router-dom';
import ajax from 'superagent';

class User extends React.Component {

  constructor(props) {
    super();
    this.state = {
      profile: [],
      events: []
    }
  }

  componentWillMount() {
		const baseURL = 'https://api.github.com/users';
    ajax.get(`${baseURL}/${this.props.match.params.username}`)
        .end((error, response) => {
            if (!error && response) {
                this.setState({ profile: response.body });
            } else {
                console.log('Error fetching profile info, error');
            }
        }
    );
    ajax.get(`${baseURL}/${this.props.match.params.username}/events`)
        .end((error, response) => {
            if (!error && response) {
                this.setState({ events: response.body });
            } else {
                console.log('Error fetching events, error');
            }
        }
    );
	}

  render(){
    return(
      <div>
        <h2 className="ui header">
          <img src={this.state.profile.avatar_url} className="ui circular image"/>
          {this.props.match.params.username}
        </h2>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Repo</th>
              <th>Public</th>
            </tr>
          </thead>
          <tbody>
            {
                this.state.events.map((event, index) => (
                  <tr key={index}>
                    <td>{event.id}</td>
                    <td>{event.type}</td>
                    <td>{event.repo.name}</td>
                    <td>{event.id}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
        <Link to="/">
          <button className="ui labeled icon button">
            <i className="left chevron icon"></i>
            Back
          </button>
        </Link>
      </div>
    )
  }
}

export default User;
