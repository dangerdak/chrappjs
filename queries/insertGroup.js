const dbConnection = require('./../database/db_connection');

let sqlInsertGroup = 'INSERT INTO groups (name, description, deadline, budget, is_assigned) '
sqlInsertGroup += 'VALUES ($1, $2, $3, $4, $5) RETURNING id;'

const sqlInsertUserGroup = 'INSERT INTO users_groups (user_id, group_id) VALUES ($1, $2) RETURNING user_id, group_id;'

const insertUserGroup = (idObj) => {
  const values = [
    idObj.userId,
    idObj.groupId
  ];
  return dbConnection.one(sqlInsertUserGroup, values);
};

const insertGroup = (userId, groupObj) => {
  const values = [
    groupObj.name,
    groupObj.description,
    groupObj.deadline,
    groupObj.budget,
    groupObj.is_assigned
  ];
  return dbConnection.one(sqlInsertGroup, values)
    .then(obj => {
      return obj.id;
    })
    .then(groupId => {
      return insertUserGroup({ userId, groupId });
    });
};

module.exports = insertGroup;
