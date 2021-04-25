var express = require("express");
var app = express();
var db = require("../../database/database.js");
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

//check fund
app.post(checkPayment_url, regularJWT, (req, res) => {
  const userID = req.body.userID;
  const params = [req.body.totalCost, userID];
  checkUserID(req, res, userID, () => {
    checkFund(checkPayment_sql, params, res);
  });
});

//check stock
app.get(checkStock_url, regularJWT, (req, res) => {
  const userID = req.params.userID;
  checkUserID(req, res, userID, () => {
    checkStock(checkStock_sql, userID, res);
  });
});

app.get(getCostAndBaskID_url, regularJWT, (req, res) => {
  const userID = req.params.userID;
  checkUserID(req, res, userID, () => {
    getCostAndID(userID, res, (totalCost, basketItemID) => {
      res.json({ totalCost: totalCost, basketItemID: basketItemID });
    });
  });
});

app.put(finalisePayment_url, regularJWT, (req, res) => {
  //   const totalCost = req.body.totalCost;
  const userID = req.body.userID;
  const deliveryDate = req.body.deliveryDate;
  const orderDate = req.body.orderDate;
  const delivAddress = req.body.delivAddress;
  checkUserID(req, res, userID, () => {
    //To finalise the order
    //pass the totalCost, userID
    //step 1, take the money
    //          deduct the money
    //      if yes, put the money back, if no, do nothing
    //step 2, update the itemDetails itemQty
    //step 3, convert the basket data into sales table
    finalisePay(userID, deliveryDate, orderDate, delivAddress, res);
  });
});

module.exports = app;
