var express = require("express");
var app = express();

// var bodyParser = require("body-parser");
// app.use(bodyParser.json());
// var cors = require("cors");
// app.use(cors());

var db = require("./../database/database.js");

app.use(require("../configuration/corsConf"));

var jwt = require("jsonwebtoken");
const { regularJWT, adminJWT } = require("../configuration/jwtConf");

app.get("/suppliers/", (req, res) => {
  const sql = "SELECT * FROM suppliers";
  db.all(sql, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ result });
  });
});

app.put("/suppliers/edit/", (req, res) => {
  var column = req.body.column;
  var suppID = req.body.suppID;
  var change = req.body.change;

  var params = [change, suppID];
  const sql = `UPDATE suppliers SET ${column} = ? WHERE suppID = ?`;
  db.all(sql, params, (err) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ message: "The supplier detail has been updated" });
  });
});

// Fetch the details of a specific supplier
app.get("/suppliers/:suppID", (req, res) => {
  var suppID = req.params.suppID;
  db.all("SELECT * FROM suppliers WHERE suppID = ?", suppID, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ result });
  });
});

module.exports = app;

app.post("/suppliers/addSupplier", (req, res) => {
  var suppID = req.body.suppID;
  var suppName = req.body.suppName;
  var suppEmail = req.body.suppEmail;
  var params = [suppID, suppName, suppEmail];
  db.run(
    "INSERT INTO suppliers (suppID, suppName, suppEmail) VALUES (?, ?, ?)",
    params,
    (err) => {
      if (err) {
        res.json({ error: err.message });
        return;
      } else {
        res.json({ message: "The new supplier has been added" });
      }
    }
  );
});
