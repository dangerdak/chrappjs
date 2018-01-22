import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import './App.css';

const axios = require('axios');

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post('/login', formData)
      .then((response) => { console.log('response ', response) })
      .catch((error) => { console.log(error) });
  }

  render() {
    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email:
          <input
            type="text"
            name="email"
            id="email"
            value={this.state.email}
          />
        </label>
        <label htmlFor="password">Password:
          <input
            type="password"
            name="password"
            id="password"
            value={this.state.password}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    );
  }
}

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
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
