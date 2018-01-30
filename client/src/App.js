import React from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Groups from './components/Groups';
import ServerError from './components/ServerError';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <div className="App">
    <Router>
      <div>
        {!localStorage.token && (
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        )}
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/groups" component={Groups} />
          <Route path="/server-error" component={ServerError} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
