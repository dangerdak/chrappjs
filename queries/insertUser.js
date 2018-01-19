const dbConnection = require('./../database/db_connection');

const sqlInsertUser = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id';

const insertUser = (name, email, hashedPassword) =>
  dbConnection.one(sqlInsertUser, [name, email, hashedPassword])
    .then(obj => obj.id);

/* istanbul ignore if */
if (require.main === module) {
  insertUser('lenny', 'lenny@gmail.com', 'pword');
}

module.exports = insertUser;
