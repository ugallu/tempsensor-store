const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
var port = process.env.PORT || 7000;

let db = new sqlite3.Database("./temps.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the temp database.");
});

db.run(
  "CREATE TABLE IF NOT EXISTS temp(epoch integer,datetime text,temp real)"
);

db.close();

app.post("/temp", (req, res) => {
  temperature = req.body.temp;
  date = new Date();
  epoch = date.getTime();
  time = date.toUTCString();

  let db = new sqlite3.Database("./temps.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the temp database.");
  });

  // insert one row into the langs table
  db.run(
    `INSERT INTO temp(epoch, datetime, temp) VALUES(?,?,?)`,
    [epoch, time, temperature],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(
        `A row has been inserted with rowid ${this.lastID} and value ${temperature}`
      );
    }
  );
  db.close();

  res.sendStatus(200);
});

app.get("/temp", (req, res) => {
  let db = new sqlite3.Database("./temps.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the temp database.");
  });

  // insert one row into the langs table
  db.all(`SELECT * from temp`, function (err, rows) {
    if (err) {
      return console.log(err.message);
      res.sendStatus(500);
    }
    res.json(JSON.stringify(rows));
  });
  db.close();
});

app.listen(port, () => console.log("Example app listening on port " + port));
