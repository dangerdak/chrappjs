const dbConnection = require('./../database/db_connection');

const sqlGetUser = 'SELECT * FROM users WHERE email = $1';

const getUser = email => dbConnection.query(sqlGetUser, [email])
  .then(userData => userData[0]);

module.exports = getUser; 
