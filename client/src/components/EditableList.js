import React from 'react';
import PropTypes from 'prop-types';

import Field from './Field';
import EditableListItem from './EditableListItem';

/*
 * Input field and current list of deletable items
 */
const EditableList = (props) => {
  const handleEnterPress = (event) => {
    const ENTER_KEY = 13;
    if (event.keyCode === ENTER_KEY) {
      event.preventDefault();
      props.handleAdd(event);
    }
  }
  return (
    <div>
      <Field
        type="text"
        id={props.inputId}
        name={props.inputId}
        value={props.inputValue}
        label={props.inputLabel}
        onKeyDown={handleEnterPress}
      >
        <input
          type="button"
          onClick={props.handleAdd}
          value="+"
        />
      </Field>
      {props.currentList.length > 0 &&
        <ul className="editable-list">
          {props.currentList.map(itemText => (
            <EditableListItem
              key={itemText}
              text={itemText}
              onDelete={props.handleDelete}
            />
          ))}
        </ul>
      }
    </div>
  );
};

EditableList.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  currentList: PropTypes.arrayOf(PropTypes.string).isRequired,
  inputLabel: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
};

export default EditableList;
