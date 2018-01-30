import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    axios.post('/register', formData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
      }).catch((err) => {
        const errorMessage = err.response.data.message;
        if (errorMessage) {
          this.handleError(errorMessage);
        } else {
          this.props.history.push('/server-error');
        }
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
          <label htmlFor="name">Name:
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.value}
            />
          </label>
          <label htmlFor="email">Email:
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.value}
            />
          </label>
          <label htmlFor="password">Password:
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.value}
            />
          </label>
          <label htmlFor="confirm-password">Confirm password:
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              value={this.state.value}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Register;
