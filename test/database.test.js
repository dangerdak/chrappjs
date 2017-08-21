const test = require('tape');
const fs = require('fs');
const path = require('path');

const dbReset = require('../database/db_build');
const dbConnection = require('../database/db_connection');
const insertUser = require('../queries/insertUser');
const getUser = require('../queries/getUser');

test('Insert user into database', (t) => {
  dbReset();
  insertUser('james', 'james@gmail.com', 'jammy', (err, result) => {
    t.equal(typeof result[0].id, 'number', 'Returns an array containing the user\'s id');
    t.end();
  });
});

test('Get user from database based on email', (t) => {
  dbReset();
  const expected = {
    name: 'james',
    email: 'james@gmail.com',
    pword: 'jammy'
  };
  insertUser('james', 'james@gmail.com', 'jammy', (err, result) => {
    getUser('james@gmail.com', (err, result) => {
      Object.keys(expected).forEach((key) => {
        t.equal(result[0].key, expected.key, `Returns object with same ${key}`);
      });
      t.end();
    });
  });
});
