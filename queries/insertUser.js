const dbConnection = require('./../database/db_connection');

const sqlInsertUser = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';

const insertUser = (name, email, hashedPassword, cb) => {
  dbConnection.query(sqlInsertUser, [name, email, hashedPassword], (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows);
    dbConnection.end();
  });
};

if (require.main === module) {
  insertUser('lenny', 'lenny@gmail.com', 'pword', console.log);
}

module.exports = insertUser;
