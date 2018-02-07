import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      budget: 0,
      deadline: '',
      errorMessage: '',
      email: '',
      invitees: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleAddInvitee = this.handleAddInvitee.bind(this);
  }

  handleError(message) {
    this.setState({ errorMessage: message });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAddInvitee() {
    this.setState(prevState => ({
      invitees: prevState.invitees.concat(prevState.email),
      email: '',
    }));
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
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.value}
            />
          </label>
          <label htmlFor="description">Description:
            <input
              type="textarea"
              name="description"
              id="description"
              value={this.state.value}
            />
          </label>
          <label htmlFor="budget">Budget:
            <input
              type="number"
              name="budget"
              id="budget"
              placeholder="£"
              value={this.state.value}
            />
          </label>
          <label htmlFor="deadline">Deadline:
            <input
              type="date"
              name="deadline"
              id="deadline"
              value={this.state.value}
            />
          </label>

          <div>{this.state.invitees.join(', ')}</div>
          <input
            type="email"
            name="email"
            value={this.state.email}
          />
          <button type="button" onClick={this.handleAddInvitee}>Add</button>
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
