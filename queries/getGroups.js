const dbConnection = require('./../database/db_connection');

const sqlGetGroupIds = 'SELECT group_id FROM users_groups WHERE user_id = $1';
const sqlGetGroups = `SELECT * FROM groups WHERE id IN (${sqlGetGroupIds})`;
const sqlGetMembers = 'SELECT id, name from users_groups INNER JOIN users ON users.id = users_groups.user_id WHERE users_groups.group_id = $1';

const getGroups = (userId) => {
  let groupList = [];
  return dbConnection.query(sqlGetGroups, [userId])
    .then((groups) => {
      groupList = groups;
      // return nested array of members for each group
      return Promise.all(groups.map(group => dbConnection.query(sqlGetMembers, [group.id])));
    }).then(allGroupsMembers =>
      // for each group object, add in a nested members object
      groupList.reduce((acc, group, i) => {
        acc.push(Object.assign(group, { members: allGroupsMembers[i] }));
        return acc;
      }, []));
};

module.exports = getGroups;
