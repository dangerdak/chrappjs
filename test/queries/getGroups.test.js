const test = require('tape');

const dbReset = require('../../database/db_build').seed;
const getGroups = require('../../queries/getGroups');

test('getGroups query', (t) => {
  const userId = 1;
  const expected = {
    owner_id: 1,
    name: 'The best group evaaz',
    description: 'This groups is better than all the others',
    is_assigned: false,
    budget: 10,
  };
  t.plan(Object.keys(expected).length);
  dbReset().then(() => getGroups(userId))
    .then(([result]) => {
      Object.keys(expected).forEach((key) => {
        t.equal(result[key], expected[key], `Returns object with same ${key}`);
      });
    })
    .catch(console.log);
});
