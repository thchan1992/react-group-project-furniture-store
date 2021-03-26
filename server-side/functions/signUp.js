var express = require("express");
var app = express();
// var bodyParser = require("body-parser");
// app.use(bodyParser.json());
// var cors = require("cors");
// app.use(cors());

var db = require("./../database/database.js");

app.use(require("../configuration/corsConf"));

var bcrypt = require("bcrypt");
var saltRounds = 10;

const { regularJWT, adminJWT } = require("../configuration/jwtConf");

//API for signUP
app.post("/signUp/", (req, res) => {
  //create a student object
  const userID = req.body.userID;
  const userType = req.body.userType;
  const userEmail = req.body.userEmail;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userAddress = req.body.lastName;
  const userPass = req.body.userPass;
  console.log(userPass);

  bcrypt.hash(userPass, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    var sql =
      "INSERT INTO userDetail (userID, userType, userEmail, firstName, lastName, userAddress, userPass) VALUES (?,?,?,?,?,?,?)";
    var params = [
      userID,
      userType,
      userEmail,
      firstName,
      lastName,
      userAddress,
      hash,
    ];
    db.run(sql, params, function (err) {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ message: "New user has been added" });
    });
  });
});

//API for signUP a admin
app.post("/signUp/admin", adminJWT, (req, res) => {
  //create a student object
  const userID = req.body.userID;
  const userType = req.body.userType;
  const userEmail = req.body.userEmail;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userAddress = req.body.lastName;
  const userPass = req.body.userPass;
  console.log(userPass);

  bcrypt.hash(userPass, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    var sql =
      "INSERT INTO userDetail (userID, userType, userEmail, firstName, lastName, userAddress, userPass) VALUES (?,?,?,?,?,?,?)";
    var params = [
      userID,
      userType,
      userEmail,
      firstName,
      lastName,
      userAddress,
      hash,
    ];
    db.run(sql, params, function (err) {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ message: "New user has been added" });
    });
  });
});

module.exports = app;
