import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Invitee from './Invitee';
import Field from './Field';

class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      budget: '',
      deadline: '',
      errorMessage: '',
      email: '',
      emails: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleAddEmail = this.handleAddEmail.bind(this);
    this.handleDeleteEmail = this.handleDeleteEmail.bind(this);
  }

  handleAddEmail() {
    this.setState(prevState => ({
      emails: prevState.emails.concat(this.state.email),
      email: '',
    }));
  }

  handleDeleteEmail(removeEmail) {
    this.setState(prevState => ({
      emails: prevState.emails.filter(email => email !== removeEmail),
    }));
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
      description: this.state.description,
      budget: this.state.budget,
      deadline: this.state.deadline,
    };

    axios.post('/create-group', formData, { headers: { authorization: `bearer ${localStorage.getItem('token')}` } })
      .then(() => {
        this.props.history.push('/groups');
      }).catch((err) => {
        if (err.response.data) {
          const errorMessage = err.response.data.message;
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
        <form
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <Field
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            label="Name: "
          />
          <Field
            type="textarea"
            name="description"
            id="description"
            value={this.state.description}
            label="Description: "
          />
          <Field
            type="number"
            name="budget"
            id="budget"
            placeholder="£"
            value={this.state.budget}
            label="Budget: "
          />
          <Field
            type="date"
            name="deadline"
            id="deadline"
            value={this.state.deadline}
            label="Deadline: "
          />
          <Field
            type="email"
            name="email"
            id="email"
            value={this.state.email}
            label="Enter emails for group invites: "
          >
            <input type="button" onClick={this.handleAddEmail} value="+" />
          </Field>
          {this.state.emails.length > 0 &&
            <ul className="invitee-list">
              {this.state.emails.map(email => (
                <Invitee
                  key={email}
                  email={email}
                  onDelete={this.handleDeleteEmail}
                />
              ))}
            </ul>
          }
          <button type="submit">Create group</button>
        </form>
      </div>
    );
  }
}

CreateGroup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default CreateGroup;
