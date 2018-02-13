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
      <li className="invitee-list__item"><span className="invitee-list__text">{this.props.email}</span>
        <input className="invitee-list__button" type="button" onClick={this.onDelete} value="x" />
      </li>
    );
  }
}

Invitee.propTypes = {
  onDelete: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default Invitee;
