const dbConnection = require('./../database/db_connection');

const sqlGetGroups = 'SELECT * FROM groups WHERE owner_id = $1';

const getGroups = userId => dbConnection.query(sqlGetGroups, [userId]);

module.exports = getGroups;
