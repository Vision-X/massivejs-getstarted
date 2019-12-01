let http    = require('http');
let express = require('express');
let app     = express();
let connStr = "postgres://localhost:5432/massive-test";
let massive = require('massive');

let db;

async function dbInstance() {
  db = await massive({
    host: 'localhost',
    port: 5432,
    database: 'massive-test',
    ssl: false
  });
}

app.set('db', dbInstance());

app.get('/', async (req, res) => {
  const tables = await db.listTables();
  console.log("  T   A   B   L   E   S   ", tables);
  let newUser = {
    email: "test@test.com",
    first: "Joe",
    last: "Test"
  };

  db.users.save(newUser, function(err, result) {
    console.log(result);;
  });
});

app.get('/users', async (req, res) => {
  const users = await db.users.find({
    'id >': 0
  });
  console.log("  U   S   E   R   S   ", users);
});

http.createServer(app).listen(8080);
