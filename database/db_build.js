const fs = require('fs');
const path = require('path');
const dbConnection = require('./db_connection');

const build = fs.readFileSync(path.join(__dirname, 'db_build.sql'), 'utf8');

dbConnection.query(build, (err, res) => {
  if (err) throw err;
  console.log('Database build successful.');
  dbConnection.end();
});
