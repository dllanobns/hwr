import React from 'react';
import { Link } from 'react-router-dom';

class List extends React.Component {
    render() {
        return (
          <div>
            <p>This is the list page.</p>
            <ul>
              <li>
                <Link to="/detail/reactt">React</Link>
              </li>
              <li>
                <Link to="/detail/react-native">React Native</Link>
              </li>
              <li>
                <Link to="/detail/jest">Jest</Link>
              </li>
            </ul>
          </div>
        );
    }
}

export default List;