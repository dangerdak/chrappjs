import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Invitee extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.props.onDelete(this.props.email);
  }

  render() {
    return (
      <li>{this.props.email}
        <input type="button" onClick={this.onDelete} value="x" />
      </li>
    );
  }
}

Invitee.propTypes = {
  onDelete: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default Invitee;
