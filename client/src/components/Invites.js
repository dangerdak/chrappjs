import React, { Component } from 'react';

class Invites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emails: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddInvitee = this.handleAddInvitee.bind(this);
  }

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  handleAddInvitee(event) {
    event.preventDefault();
    this.setState(prevState => ({
      emails: prevState.emails.concat(prevState.email),
      email: '',
    }));
  }

  render() {
    return (
      <div>
        <div>{this.state.emails.join(', ')}</div>
        <input
          onChange={this.handleChange}
          type="email"
          name="email"
          value={this.state.email}
        />
        <button onClick={this.handleAddInvitee}>Add</button>
      </div>
    );
  }
}

export default Invites;
