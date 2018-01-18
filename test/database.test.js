const test = require('tape');
const fs = require('fs');
const path = require('path');

const dbConnection = require('../database/db_connection');
const insertUser = require('../queries/insertUser');
const getUser = require('../queries/getUser');

const QueryFile = require('pg-promise').QueryFile;
const seedFile = new QueryFile(path.join(__dirname, '..', 'database', 'db_seed.sql'), { minify: true });
const dbReset = require('../database/db_build').bind(null, seedFile);

dbReset().then(() => {
  test('Insert user into database', (t) => {
    insertUser('james', 'james@gmail.com', 'jammy')
      .then(id => {
        t.equal(typeof id, 'number', 'Returns the user\'s id');
        t.end();
      })
      .catch(err => {
        console.log(err);
      })
      .then(dbReset);
  });

  test('Get user from database based on email', (t) => {
    getUser('sam@gmail.com')
      .then(result => {
        const expected = {
          name: 'sam',
          email: 'sam@gmail.com',
          password: '$2a$10$CEicRuoB3hvCnlDx9Of/deXIiRInjoRhYuC9VKdox7n0zVXMbzJb2'
        };
        return Object.keys(expected).forEach((key) => {
          t.equal(result.key, expected.key, `Returns object with same ${key}`);
        });
      })
      .then(() => {
        t.end();
      })
      .catch(err => {
        console.log(err);
      })
      .then(dbReset);
  });
});
