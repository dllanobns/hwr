import React from 'react';
import { Link } from 'react-router-dom';

class User extends React.Component {
  render(){
    return(
      <div>
        <p>User</p><br/>
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
