import React from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Groups from './components/Groups';
import ServerError from './components/ServerError';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <div className="App">
    <Router>
      <div>
        <nav>
          {!localStorage.token && <Link to="/login">Login</Link>}
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/groups" component={Groups} />
          <Route path="/server-error" component={ServerError} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
