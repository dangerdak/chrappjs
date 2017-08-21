const fs = require('fs');
const path = require('path');
const dbConnection = require('./db_connection');

const sqlBuild = fs.readFileSync(path.join(__dirname, 'db_build.sql'), 'utf8');

const build = () => {
  dbConnection.query(sqlBuild, (err, res) => {
    if (err) throw err;
    console.log('Database build successful.');
  });
}

if (require === module) {
  build();
}

module.exports = build;
