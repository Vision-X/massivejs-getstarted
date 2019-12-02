const massive = require('massive');

let db;

exports = module.exports = function() {
  if (db) return db;

  return massive({
    host: 'localhost',
    port: 5432,
    database: 'massive-test',
    ssl: false
  }).then(dbInstance => {
          db = dbInstance;
          return Promise.resolve(db);
  })
};
