import React from 'react';
import PropTypes from 'prop-types';

/*
 * Labelled HTML input field
 */
const Field = (props) => {
  return (
    <div className="form__field">
      <label htmlFor={props.id}>{props.label}</label>
      {props.children ?
        <div className="form__input">
          <input
            type={props.type}
            name={props.name}
            id={props.id}
            value={props.value}
            onKeyDown={props.onKeyDown}
          />
          {props.children}
        </div>
        :
        <input
          className="form__input"
          type={props.type}
          name={props.name}
          id={props.id}
          value={props.value}
          onKeyDown={props.onKeyDown}
        />
      }
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Field;
