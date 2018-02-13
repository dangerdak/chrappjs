import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
 * Single list item from an editable list, with an associated delete button
 */
class EditableListItem extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.props.onDelete(this.props.text);
  }

  render() {
    return (
      <li className="editable-list__item"><span className="editable-list__text">{this.props.text}</span>
        <input className="editable-list__delete-button" type="button" onClick={this.onDelete} value="x" />
      </li>
    );
  }
}

EditableListItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default EditableListItem;
