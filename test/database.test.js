const test = require('tape');
const fs = require('fs');
const path = require('path');

const dbReset = require('../database/db_build');
const dbConnection = require('../database/db_connection');
const insertUser = require('../queries/insertUser');
const getUser = require('../queries/getUser');
const insertGroup = require('../queries/insertGroup');

test('Insert user into database', (t) => {
  dbReset()
    .then(() => {
      return insertUser('james', 'james@gmail.com', 'jammy')
    })
    .then(userId => {
      t.equal(typeof userId, 'number', 'Returns the user\'s id');
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

test('Insert group into database', (t) => {
  dbReset()
    .then(() => {
      return insertUser('james', 'james@gmail.com', 'jammy')
    })
    .then(userId => {
      const today = new Date();
      const futureDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()+1}`;

      const groupInfo = {
        name: 'Crabbies',
        description: 'Xmas pressies for all',
        budget: 80,
        is_assigned: false,
        deadline: futureDate,
      };
      return insertGroup(userId, groupInfo)
    })
    .then(idObj => {
      t.equal(typeof idObj.group_id, 'number', 'Returns an object containing the group\'s id');
      t.equal(typeof idObj.user_id, 'number', 'Returns an object containing the user\'s id');
      t.end();
    })
    .catch(err => {
      console.log(err);
    })
});
