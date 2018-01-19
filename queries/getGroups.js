const dbConnection = require('./../database/db_connection');

const sqlGetGroups = 'SELECT * FROM groups WHERE id IN (SELECT group_id FROM users_groups WHERE user_id = $1);';

const getGroups = userId => dbConnection.query(sqlGetGroups, [userId]);

module.exports = getGroups;
