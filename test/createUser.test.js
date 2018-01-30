const test = require('tape');

const dbReset = require('../database/db_build').seed;
const createUser = require('../src/lib/createUser');
const getUser = require('../queries/getUser');

dbReset().then(() => {
  test('createUser', (t) => {
    const input = {
      name: 'bill',
      email: 'bill@gmail.com',
      password: 'password',
    };
    createUser(input.name, input.email, input.password)
      .then((id) => {
        t.equals(typeof id, 'number', 'Returns id of created user');
        return getUser(input.email);
      }).then((userData) => {
        t.notEqual(userData.password, input.password, 'Doesnt store plain text password');
        t.end();
      })
      .catch(console.log);
  });
});
