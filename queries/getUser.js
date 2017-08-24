const dbConnection = require('./../database/db_connection');

const sqlGetUser = 'SELECT * FROM users WHERE email = $1';

const getUser = (email) => {
  return dbConnection.query(sqlGetUser, [email])
    .then(data => {
      return data;
    })
};

module.exports = getUser;
