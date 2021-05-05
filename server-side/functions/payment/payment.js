var express = require("express");
var app = express();
app.use(require("../../configuration/corsConf"));
const { regularJWT, checkUserID } = require("../../configuration/jwtConf");
const {
  finalisePay,
  getCostAndID,
  checkFund,
  checkStock,
} = require("./payment_func");
const { checkPayment_sql, checkStock_sql } = require("./payment_sql");

const {
  checkStock_url,
  checkPayment_url,
  getCostAndBaskID_url,
  finalisePayment_url,
} = require("./payment_url");

//check if users fund is enough for the order
app.post(checkPayment_url, regularJWT, (req, res) => {
  const userID = req.body.userID;
  const params = [req.body.totalCost, userID];
  checkUserID(req, res, userID, () => {
    checkFund(checkPayment_sql, params, res);
  });
});

//check if the stock is enough for users order
app.get(checkStock_url, regularJWT, (req, res) => {
  const userID = req.params.userID;
  checkUserID(req, res, userID, () => {
    checkStock(checkStock_sql, userID, res);
  });
});

//get the cost of the order and basket ID of the user
app.get(getCostAndBaskID_url, regularJWT, (req, res) => {
  const userID = req.params.userID;
  checkUserID(req, res, userID, () => {
    getCostAndID(userID, res, (totalCost, basketItemID) => {
      res.json({ totalCost: totalCost, basketItemID: basketItemID });
    });
  });
});

//finalise the order and payment of the user
app.put(finalisePayment_url, regularJWT, (req, res) => {
  //   const totalCost = req.body.totalCost;
  const userID = req.body.userID;
  const deliveryDate = req.body.deliveryDate;
  const orderDate = req.body.orderDate;
  const delivAddress = req.body.delivAddress;
  checkUserID(req, res, userID, () => {
    //the function that handles the request
    finalisePay(userID, deliveryDate, orderDate, delivAddress, res);
  });
});

module.exports = app;
