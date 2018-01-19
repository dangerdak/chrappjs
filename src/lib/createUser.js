const bcrypt = require('bcrypt');
const insertUser = require('../../queries/insertUser');

// Hashes password and then saves user to DB, returning user id
const createUser = (name, email, password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds).then(hashedPassword => {
    return insertUser(name, email, hashedPassword);
  })
};

module.exports = createUser;
