var express = require("express");
var bodyParser = require("body-parser");
var db = require("./database.js");
var app = express();
var bcrypt = require("bcrypt");
var saltRounds = 10;
app.use(bodyParser.json());

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
