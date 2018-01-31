const test = require('tape');

const dbReset = require('../../database/db_build').seed;

const insertUser = require('../../queries/insertUser');

test('Insert user into database', (t) => {
  dbReset().then(() => insertUser('james', 'james@gmail.com', 'jammy'))
    .then((id) => {
      t.equal(typeof id, 'number', 'Returns the user\'s id');
      t.end();
    })
    .catch(console.log);
});
