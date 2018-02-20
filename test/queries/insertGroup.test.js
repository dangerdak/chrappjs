const test = require('tape');

const dbReset = require('../../database/db_build').seed;

const insertUser = require('../../queries/insertUser');
const insertGroup = require('../../queries/insertGroup');
const getGroups = require('../../queries/getGroups');

test('Insert group into database', (t) => {
  const today = new Date();
  const futureDate = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`;
  const groupInfo = {
    name: 'Crabbies',
    description: 'Xmas pressies for all',
    budget: 80,
    is_assigned: false,
    deadline: futureDate,
  };
  t.plan(1);
  dbReset().then(() => insertUser('james', 'james@gmail.com', 'jammy'))
    .then(userId => insertGroup(userId, groupInfo).then(() => getGroups(userId)))
    .then((groups) => {
      const newGroup = groups[0];
      t.deepEqual(newGroup.members[0].id, newGroup.owner_id, 'Makes owner a member of the new group');
    })
    .catch(console.log);
});
