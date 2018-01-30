const test = require('tape');

const dbReset = require('../database/db_build').seed;

const insertUser = require('../queries/insertUser');
const getUser = require('../queries/getUser');
const insertGroup = require('../queries/insertGroup');

dbReset().then(() => {
  test('Insert user into database', (t) => {
    insertUser('james', 'james@gmail.com', 'jammy')
      .then((id) => {
        t.equal(typeof id, 'number', 'Returns the user\'s id');
        t.end();
      })
      .catch(console.log)
      .then(() => dbReset());
  });

  test('Get user from database based on email', (t) => {
    t.plan(3);
    getUser('sam@gmail.com')
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
      .catch(console.log)
      .then(() => dbReset());
  });

  test('Insert group into database', (t) => {
    insertUser('james', 'james@gmail.com', 'jammy')
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
      .then((id) => {
        t.equal(typeof id, 'number', 'Returns the groups id');
        t.end();
      })
      .catch(console.log)
      .then(() => dbReset());
  });
});
