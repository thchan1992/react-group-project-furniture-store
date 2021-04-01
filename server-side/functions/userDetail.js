var express = require("express");
var app = express();

// var cors = require("cors");
// app.use(cors());
// var bodyParser = require("body-parser");
// app.use(bodyParser.json());

var db = require("./../database/database.js");

app.use(require("../configuration/corsConf"));

var jwt = require("jsonwebtoken");
const { regularJWT, adminJWT } = require("../configuration/jwtConf");

var bcrypt = require("bcrypt");
var saltRounds = 10;

// Fetch the user details
app.get("/account/personalDetails/:userID", (req, res) => {
  var userID = req.params.userID;
  db.get("SELECT * FROM userDetail WHERE userID = ?", userID, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ result });
  });
});

// Update user personal details
app.put("/account/personalDetails/edit", (req, res) => {
  var column = req.body.column;
  var userID = req.body.userID;
  var change = req.body.change;
  var params = [change, userID];

  //if the user wants to change the pasword
  if (column == "userPass") {
    //encrypt the new password by using bcrypt
    bcrypt.hash(change, saltRounds, (err, hash) => {
      if (err) {
        //show error
        console.log(err);
        //If no errors, then set the new password into the database
      } else {
        var sql = "UPDATE userDetail set userPass = ? where userID =?";
        var params = [hash, userID];
        db.run(sql, params, (err, result) => {
          if (err) {
            res.status(400).json({ error: res.message });
            return;
          }
          res.json({
            message: "Personal details updated.",
          });
        });
      }
    });
  }

  // Set the new details into the database for any attributes different than password
  else {
    db.all(
      `UPDATE userDetail SET ${column} = ? WHERE userID = ?`,
      params,
      (err) => {
        if (err) {
          res.status(400).json({ error: res.message });
          return;
        }
        res.json({
          message: "Personal details updated.",
        });
      }
    );
  }
});

module.exports = app;
