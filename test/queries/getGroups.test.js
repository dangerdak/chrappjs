const test = require('tape');

const dbReset = require('../../database/db_build').seed;
const getGroups = require('../../queries/getGroups');

test('getGroups query', (t) => {
  // TODO: hardcoding id could be brittle
  const userId = 2;
  const expected = {
    owner_id: 1,
    name: 'The best group evaaz',
    description: 'This groups is better than all the others',
    is_assigned: false,
    budget: 10,
    members: [{ name: 'sam' }, { name: 'bob' }],
  };
  t.plan(Object.keys(expected).length);
  dbReset().then(() => getGroups(userId))
    .then(([result]) => {
      Object.keys(expected).forEach((key) => {
        t.deepEqual(result[key], expected[key], `Returns object with same ${key}`);
      });
    })
    .catch(console.log);
});
