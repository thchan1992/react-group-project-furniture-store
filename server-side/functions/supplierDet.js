var cors = require("cors");
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./../database/database.js");
var app = express();
var bcrypt = require("bcrypt");
var saltRounds = 10;
app.use(bodyParser.json());
app.use(cors());
app.use(require("../configuration/corsConf"));
const { regularJWT, adminJWT } = require("../configuration/jwtConf");

app.get("/supplier/", (req, res) => {
  const sql = "SELECT * FROM suppliers";
  db.all(sql, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ result });
  });
});

app.put("/supplier/edit/", (req, res) => {
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

module.exports = app;
