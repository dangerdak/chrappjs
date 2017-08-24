const test = require('tape');
const fs = require('fs');
const path = require('path');

const dbReset = require('../database/db_build');
const dbConnection = require('../database/db_connection');
const insertUser = require('../queries/insertUser');
const getUser = require('../queries/getUser');

test('Insert user into database', (t) => {
  dbReset()
    .then(() => {
      return insertUser('james', 'james@gmail.com', 'jammy')
    })
    .then(id => {
      t.equal(typeof id, 'number', 'Returns the user\'s id');
      t.end();
    })
    .catch(err => {
      console.log(err);
    })
});

test('Get user from database based on email', (t) => {
  dbReset()
    .then(() => {
      return insertUser('james', 'james@gmail.com', 'jammy')
    })
    .then(() => {
      return getUser('james@gmail.com');
    })
    .then(result => {
      const expected = {
        name: 'james',
        email: 'james@gmail.com',
        pword: 'jammy'
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
});
