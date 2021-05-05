var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(require("../../configuration/corsConf"));
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var session = require("express-session");
const { login, loginSess, logout } = require("./login_func");
const { login_sql } = require("./login_sql");
const { login_url, logout_url } = require("./login_url");
const { regularJWT } = require("../../configuration/jwtConf");

//set up the session and the expires time
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
