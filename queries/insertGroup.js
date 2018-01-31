const dbConnection = require('./../database/db_connection');

let sqlInsertGroup = 'INSERT INTO groups (owner_id, name, description, deadline, budget, is_assigned) ';
sqlInsertGroup += 'VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';

const insertGroup = (userId, groupObj) => {
  const values = [
    userId,
    groupObj.name,
    groupObj.description,
    groupObj.deadline,
    +groupObj.budget,
    groupObj.is_assigned,
  ];
  return dbConnection.one(sqlInsertGroup, values)
    .then(idObj => idObj.id);
};

module.exports = insertGroup;
