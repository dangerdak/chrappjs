const test = require('tape');

const dbReset = require('../../database/db_build').seed;
const getUser = require('../../queries/getUser');

test('Get user from database based on email', (t) => {
  t.plan(3);
  dbReset().then(() => getUser('sam@gmail.com'))
    .then((result) => {
      const expected = {
        name: 'sam',
        email: 'sam@gmail.com',
        password: '$2a$10$CEicRuoB3hvCnlDx9Of/deXIiRInjoRhYuC9VKdox7n0zVXMbzJb2',
      };
      return Object.keys(expected).forEach((key) => {
        t.equal(result.key, expected.key, `Returns object with same ${key}`);
      });
    })
    .catch(console.log);
});

