var express = require("express");
var app = express();
//This is to enable the app.post log in function
app.use(express.json());
app.use(express.urlencoded());

// var db = require("../../database/database.js");
app.use(require("../../configuration/corsConf"));

var cookieParser = require("cookie-parser");
app.use(cookieParser());
// var bcrypt = require("bcrypt");
var session = require("express-session");

const { login, loginSess, logout } = require("./login_func");
// var jwt = require("jsonwebtoken");
const { login_sql } = require("./login_sql");
const { login_url, logout_url } = require("./login_url");

const { regularJWT } = require("../../configuration/jwtConf");

//set up the session
app.use(
  session({
    key: "userID",
    secret: "group47",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 1000 * 36000 },
  })
);

//Login API request
app.post(login_url, (req, res) => {
  const sql = "SELECT * FROM userDetail WHERE userEmail =?";
  const userEmail = req.body.userEmail;
  const userPass = req.body.userPass;
  login(login_sql, userEmail, userPass, req, res);
});

//Session - Login API request
app.get(login_url, regularJWT, (req, res) => {
  loginSess(req, res);
});

//Logout API request
app.get(logout_url, regularJWT, (req, res) => {
  logout(req, res);
});

module.exports = app;
