const test = require('tape');

const dbReset = require('../database/db_build').seed;

const insertUser = require('../queries/insertUser');
const getUser = require('../queries/getUser');
const insertGroup = require('../queries/insertGroup');

test('Insert user into database', (t) => {
  dbReset().then(() => insertUser('james', 'james@gmail.com', 'jammy'))
    .then((id) => {
      t.equal(typeof id, 'number', 'Returns the user\'s id');
      t.end();
    })
    .catch(console.log);
});

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

test('Insert group into database', (t) => {
  dbReset().then(() => insertUser('james', 'james@gmail.com', 'jammy'))
    .then((userId) => {
      const today = new Date();
      const futureDate = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`;

      const groupInfo = {
        name: 'Crabbies',
        description: 'Xmas pressies for all',
        budget: 80,
        is_assigned: false,
        deadline: futureDate,
      };
      return insertGroup(userId, groupInfo);
    })
    .then((idObj) => {
      t.equal(typeof idObj.group_id, 'number', 'Returns an object containing the group\'s id');
      t.equal(typeof idObj.user_id, 'number', 'Returns an object containing the user\'s id');
      t.end();
    })
    .catch(console.log);
});
