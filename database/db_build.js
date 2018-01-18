const fs = require('fs');
const path = require('path');
const dbConnection = require('./db_connection');
const QueryFile = require('pg-promise').QueryFile;

const build = (queryFile) => {
  return dbConnection.any(queryFile)
    .then(() => {
      console.log('Database build successful.');
    })
    .catch(console.log);
}

/* instanbul ignore if */
if (require.main === module) {
  let fileName;
  if (process.argv[2] === '--seed') {
    fileName = 'db_seed.sql';
  } else {
    fileName = 'db_build.sql';
  }
  const queryFile = new QueryFile(path.join(__dirname, fileName), { minify: true });
  build(queryFile);
}

module.exports = build;
