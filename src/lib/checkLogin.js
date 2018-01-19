const bcrypt = require('bcrypt');
const getUser = require('../../queries/getUser');

// Returns a userData object if login successful, otherwise undefined
const checkLogin = (email, inputPassword) =>
  getUser(email).then((userData) => {
    if (userData) {
      return bcrypt.compare(inputPassword, userData.password)
        .then(match => (
          match ? userData : undefined
        ));
    }
    return undefined;
  });

module.exports = checkLogin;
