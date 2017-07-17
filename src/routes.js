import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import App from './pages/App';
import List from './pages/List';
import Detail from './pages/Detail';
import User from './pages/User';

const Routes = () => {
    return (
      <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
        <div>
          <Route exact path="/" component={ App }/>
          <Route exact path="/" component={ List }/>
          <Route path="/detail/:repo" component={ Detail }/>
          <Route path="/user/:username" component={ User }/>
        </div>
      </HashRouter>
    )
}

export default Routes;
