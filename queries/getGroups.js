const dbConnection = require('./../database/db_connection');

const sqlGetGroups = 'SELECT * FROM groups WHERE id IN (SELECT group_id FROM users_groups WHERE user_id = $1);';

const getGroups = (userId) => {
  return dbConnection.query(sqlGetGroups, [userId])
    .then(groups => {
      return groups;
    })
  .catch(err => {
    console.log(err);
  });
};

module.exports = getGroups;
