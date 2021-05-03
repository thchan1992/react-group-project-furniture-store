var express = require("express");
var app = express();
app.use(require("../../configuration/corsConf"));
const { regularJWT, checkUserID } = require("../../configuration/jwtConf");
const {
  fetchUserDet_url,
  updateUserDet_url,
  fetchUserCard_url,
  updateUserCard_url,
  getUserOrdList_url,
  orderConfirmation_url,
  getOrdHist_url,
} = require("./user_url");
const {
  fetchUserDet_sql,
  fetchUserCard_sql,
  updateUserCard_sql,
  getUserOrdList_sql,
  orderConfirmation_sql,
  getOrdHist_sql,
} = require("./user_sql");
const { getAll, getOne, runCom } = require("../../configuration/generalFunc");
const { updateUserDet } = require("./user_func");

// Fetch the user details
app.get(fetchUserDet_url, regularJWT, (req, res) => {
  var userID = req.params.userID;
  checkUserID(req, res, userID, () => {
    getOne(fetchUserDet_sql, userID, res);
  });
});

// Update user personal details
app.put(updateUserDet_url, regularJWT, (req, res) => {
  const userID = req.body.userID;
  checkUserID(req, res, userID, () => {
    updateUserDet(req, res);
  });
});

// Fetch the user's card payment details
app.get(fetchUserCard_url, regularJWT, (req, res) => {
  var userID = req.params.userID;
  checkUserID(req, res, userID, () => {
    getOne(fetchUserCard_sql, userID, res);
  });
});

//update user card detail
app.put(updateUserCard_url, regularJWT, (req, res) => {
  const payMetID = req.body.payMetID;
  const cardNumber = req.body.cardNumber;
  const userID = req.body.userID;
  const expire_Date = req.body.expire_Date;
  const ccv = req.body.ccv;
  const funds = 10000;
  checkUserID(req, res, userID, () => {
    runCom(
      updateUserCard_sql,
      [payMetID, cardNumber, expire_Date, ccv, funds, userID],
      res,
      "Card detail has been updated"
    );
  });
});

// Fetch a list of all the orders placed by a specific userID
app.get(getUserOrdList_url, (req, res) => {
  const userID = req.params.userID;
  getAll(getUserOrdList_sql, userID, res);
});

// Fetch the details of a specific order placed
app.get(orderConfirmation_url, (req, res) => {
  const basketItemID = req.params.basketItemID;
  getAll(orderConfirmation_sql, basketItemID, res);
});

app.get(getOrdHist_url, regularJWT, (req, res) => {
  const userID = req.params.userID;
  checkUserID(req, res, userID, () => {
    getAll(getOrdHist_sql, userID, res);
  });
});

module.exports = app;
