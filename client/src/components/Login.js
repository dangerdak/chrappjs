import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
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
        if (response.data.success) {
          this.props.history.push('/groups');
        } else {
          this.handleError(response.data.errorMessage);
        }
      }).catch(() => {
        this.props.history.push('/server-error');
      });
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div>
        {errorMessage && (
          <p>{errorMessage}</p>
        )}
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
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
