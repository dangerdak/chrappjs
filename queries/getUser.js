const dbConnection = require('./../database/db_connection');

const sqlGetUser = 'SELECT * FROM users WHERE email = $1';

const getUser = (email, cb) => {
  dbConnection.query(sqlGetUser, [email])
    .then(data => {
      return cb(data);
    })
};

module.exports = getUser;
