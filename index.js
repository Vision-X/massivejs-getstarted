const http    = require('http');
const express = require('express');
const app     = express();
const massive = require('massive');
const monitor = require('pg-monitor');
const connStr = "postgres://localhost:5432/massive-test";

let db;

async function dbInstance() {
  db = await massive({
    host: 'localhost',
    port: 5432,
    database: 'massive-test',
    ssl: false
  });
};

app.set('db', dbInstance());

app.get('/newUser/:email/:first/:last', async (req, res) => {
  let mail = req.params.email;
  let fName = req.params.first;
  let lName = req.params.last;
  let newUser = {
    email: mail || "Tarful@Wookie.com",
    first: fName || "Tarful",
    last: lName || "N/A"
  };

  db.users.save(newUser, function(err, result) {
    if (err) console.log(err)
    else console.log("New User : ", result)
  }).then(() => {
    res.send("New User Added!!!!");
  });
});

app.get('/users', async (req, res) => {
  const users = await db.query('select * from users');
  console.log("  U   S   E   R   S   ", users);
  res.send(users);
});

app.get('/user/:id', async (req, res) => {
  let userId = req.params.id;
  const user = await db.users.find({ 'id =': userId });
  user.length ? res.send(user) : res.send("User record not found");
});

http.createServer(app).listen(8080);
