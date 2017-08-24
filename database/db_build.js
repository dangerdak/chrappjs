const fs = require('fs');
const path = require('path');
const dbConnection = require('./db_connection');

const sqlBuild = fs.readFileSync(path.join(__dirname, 'db_build.sql'), 'utf8');

const build = (cb) => {
  dbConnection.query(sqlBuild, (err, res) => {
    if (err) throw err;
    if (cb) {
      cb();
    }
    console.log('Database build successful.');
  });
}

/* instanbul ignore if */
if (require === module) {
  build();
}

module.exports = build;
