const test = require('tape');

const dbReset = require('../../database/db_build').seed;

const insertUser = require('../../queries/insertUser');
const insertGroup = require('../../queries/insertGroup');

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
    .then((id) => {
      t.equal(typeof id, 'number', 'Returns the group\'s id');
      t.end();
    })
    .catch(console.log);
});
