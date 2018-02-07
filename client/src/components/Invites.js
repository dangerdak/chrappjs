import React, { Component } from 'react';

import Invitee from './Invitee';

class Invites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emails: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddInvitee = this.handleAddInvitee.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  handleAddInvitee(event) {
    event.preventDefault();
    this.setState(prevState => ({
      emails: prevState.emails.concat(this.state.email),
      email: '',
    }));
  }

  handleDelete(removeEmail) {
    this.setState(prevState => ({
      emails: prevState.emails.filter(email => email !== removeEmail),
    }));
  }

  render() {
    const { emails } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Enter emails for group invites:
        </label>
        <input
          onChange={this.handleChange}
          type="email"
          name="email"
          id="email"
          value={this.state.email}
        />
        <button onClick={this.handleAddInvitee}>+</button>
        {emails.length > 0 &&
          <ul>
            {emails.map(email => (
              <Invitee
                key={email}
                email={email}
                onDelete={this.handleDelete}
              />
            ))}
          </ul>
        }
      </div>
    );
  }
}

export default Invites;
