const path = require('path');
const dbConnection = require('./db_connection');
const { QueryFile } = require('pg-promise');

const seedFile = new QueryFile(path.join(__dirname, 'db_seed.sql'), { minify: true });
const buildFile = new QueryFile(path.join(__dirname, 'db_build.sql'), { minify: true });

const build = queryFile => dbConnection.any(queryFile)
  .then(() => {
    console.log('Database build successful.');
  });

/* istanbul ignore if */
if (require.main === module) {
  let file;
  if (process.argv[2] === '--seed') {
    file = seedFile;
  } else {
    file = buildFile;
  }
  build(file)
    .catch(console.log);
}

module.exports = {
  build: build.bind(null, buildFile),
  seed: build.bind(null, seedFile),
};
