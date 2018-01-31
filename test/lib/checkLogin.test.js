const test = require('tape');

const dbReset = require('../../database/db_build').seed;
const checkLogin = require('../../src/lib/checkLogin');

test('checkLogin', (t) => {
  t.plan(4);
  dbReset().then(() => checkLogin('sam@gmail.com', 'password'))
    .then((actual) => {
      const expected = {
        id: 1,
        name: 'sam',
        email: 'sam@gmail.com',
        password: '$2a$10$CEicRuoB3hvCnlDx9Of/deXIiRInjoRhYuC9VKdox7n0zVXMbzJb2',
      };
      t.ok(actual, 'Returns truthy value if login successful');
      t.deepEqual(actual, expected, 'Returns correct user data if login successful');
    })
    .then(() =>
      checkLogin('samm@gmail.com', 'password'))
    .then((actual) => {
      t.equal(actual, undefined, 'Returns undefined if email incorrect');
    })
    .then(() =>
      checkLogin('sam@gmail.com', 'password1'))
    .then((actual) => {
      t.equal(actual, undefined, 'Returns undefined if password incorrect');
    })
    .catch(console.log);
});
