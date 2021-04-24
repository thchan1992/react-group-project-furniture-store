var express = require("express");
var app = express();
var db = require("../../database/database.js");
app.use(require("../../configuration/corsConf"));
const { adminJWT } = require("../../configuration/jwtConf");
const { showPayMet_sql, checkPayDet_sql } = require("./signUp_sql");
const {
  signUp,
  signUpAdmin_url,
  showPayMet_url,
  checkPayDet_url,
} = require("./signUp_url");
const { signUpNewAcc } = require("./signUp_func");
const { getAll, getOne } = require("../../configuration/generalFunc.js");

//API for signUP
app.post(signUp, (req, res) => {
  signUpNewAcc(req, res, false);
});

//API for signUP a admin
app.post(signUpAdmin_url, adminJWT, (req, res) => {
  signUpNewAcc(req, res, true);
});

app.get(showPayMet_url, (req, res) => {
  getAll(showPayMet_sql, null, res);
});

//need to be altered, to check it to true or false
app.get(checkPayDet_url, (req, res) => {
  const cardNumber = req.params.cardNumber;
  getOne(checkPayDet_sql, cardNumber, res);
});

module.exports = app;
