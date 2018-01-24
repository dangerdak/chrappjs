import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Groups from './components/Groups';
import ServerError from './components/ServerError';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <Link to="/login">Login</Link>
            </nav>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/groups" component={Groups} />
              <Route path="/server-error" component={ServerError} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
