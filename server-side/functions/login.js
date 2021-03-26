var express = require("express");
var app = express();

// var cors = require("cors");
// app.use(cors());
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

//This is to enable the app.post log in function
app.use(express.json());
app.use(express.urlencoded());

var db = require("./../database/database.js");
app.use(require("../configuration/corsConf"));

var cookieParser = require("cookie-parser");
app.use(cookieParser());
var bcrypt = require("bcrypt");
var session = require("express-session");

var jwt = require("jsonwebtoken");
const { regularJWT, adminJWT } = require("../configuration/jwtConf");

//set up the session
app.use(
  session({
    key: "userID",
    secret: "group47",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 60 * 60 * 24 },
  })
);

//Login API request
app.post("/login/", (req, res) => {
  const sql = "SELECT * FROM userDetail WHERE userEmail =?";
  const userEmail = req.body.userEmail;
  const userPass = req.body.userPass;
  db.all(sql, userEmail, (err, result) => {
    if (err) {
      res.json({ err: err });
      return;
    }
    if (result.length > 0) {
      //bcrypt decode the userPass and check whether it matches the password from the front end.
      bcrypt.compare(userPass, result[0].userPass, (error, response) => {
        if (response) {
          const userID = result[0].userID;
          const userEmail = result[0].userEmail;
          const userType = result[0].userType;
          //create the token by using the userID, userEmail and userType
          const token = jwt.sign({ userID, userEmail, userType }, "Group47", {
            expiresIn: 300,
          });
          //create a session
          req.session.user = result;
          //return the token back to the front.
          res.json({ auth: true, token: token, result: result });
        } else {
          res.send({ auth: false, message: "Wrong username or password" });
        }
      });
    } else {
      res.send({ auth: false, message: "User doesn't exist" });
    }
  });
});

//Session - Login API request
app.get("/login/", regularJWT, (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

//Logout API request
app.get("/logout/", regularJWT, (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

module.exports = app;
