import React from 'react';
import PropTypes from 'prop-types';

const GroupDetail = ({ group }) => (
  <article>
    <h2>{group.name}</h2>
    <p>Budget: £{group.budget}</p>
    <p>{group.description}</p>
    <ul>Members: </ul>
    <p>Your wishlist: </p>
    { group.isAssigned &&
      <div>
        <p>Your recipient: </p>
        <p>Recipients wishlist: </p>
      </div>
    }
  </article>
);

GroupDetail.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default GroupDetail;
