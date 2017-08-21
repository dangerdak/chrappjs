const dbConnection = require('./../database/db_connection');

const sqlGetUser = 'SELECT * FROM users WHERE email = $1';

const getUser = (email, cb) => {
  dbConnection.query(sqlGetUser, [email], (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows[0]);
  });
};

module.exports = getUser;
