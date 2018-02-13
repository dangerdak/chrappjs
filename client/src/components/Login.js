import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Field from './Field';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      redirectToReferrer: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleError(message) {
    this.setState({ errorMessage: message });
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
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        this.setState({ redirectToReferrer: true });
      }).catch((err) => {
        const errorMessage = err.response.data.message;
        if (errorMessage) {
          this.handleError(errorMessage);
        } else {
          this.props.history.push('/server-error');
        }
      });
  }

  componentWillMount() {
    const redirected = this.props.location.state;
    if (redirected) {
      this.handleError('Please login to continue');
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { errorMessage, redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }
    return (
      <div>
        {errorMessage && (
          <p>{errorMessage}</p>
        )}
        <form
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <Field
            type="text"
            name="email"
            id="email"
            value={this.state.email}
            label="Email: "
          />
          <Field
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            label="Password: "
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Login;
