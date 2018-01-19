const bcrypt = require('bcrypt');
const getUser = require('../../queries/getUser');

// Returns a userData object if login successful, otherwise undefined
const checkLogin = (email, inputPassword) => {
  return getUser(email).then(userData => {
    if (userData) {
      return Promise.all([userData, bcrypt.compare(inputPassword, userData.password)])
        .then(([userData, match]) => {
          return match ? userData : undefined;
        })
    }
  });
};

module.exports = checkLogin;
