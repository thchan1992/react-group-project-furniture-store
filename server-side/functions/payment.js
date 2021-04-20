var express = require("express");
var app = express();
var db = require("./../database/database.js");
app.use(require("../configuration/corsConf"));
var jwt = require("jsonwebtoken");
const { regularJWT, adminJWT } = require("../configuration/jwtConf");
const { finalisePay, getCostAndID } = require("./paymentUtility");

//check fund
app.post("/payment/checkFund", (req, res) => {
  const params = [req.body.totalCost, req.body.userID];
  db.get(
    "select * from payMentDetail WHERE funds >= ? AND userID = ?",
    params,
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      if (!result) {
        res.json({ result: false });
      } else {
        res.json({ result: true });
      }
    }
  );
});

//check stock
app.get("/payment/checkStock/:userID", (req, res) => {
  const params = req.params.userID;
  db.get(
    "select (itemQty - itemBasketQty) AS Qty FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID WHERE Qty < 0 AND userID = ?",
    params,
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      if (!result) {
        res.json({ result: true });
      } else {
        res.json({ result: false });
      }
    }
  );
});

app.put("/payment/finalise", (req, res) => {
  //   const totalCost = req.body.totalCost;
  const userID = req.body.userID;
  const deliveryDate = req.body.deliveryDate;
  const orderDate = req.body.orderDate;
  const delivAddress = req.body.delivAddress;
  console.log("Address ", delivAddress);
  //To finalise the order
  //pass the totalCost, userID
  //step 1, take the money
  //          deduct the money
  //      if yes, put the money back, if no, do nothing
  //step 2, update the itemDetails itemQty
  //step 3, convert the basket data into sales table
  finalisePay(userID, deliveryDate, orderDate, delivAddress, res);
});

app.get("/payment/getCostAndBaskID/:userID", (req, res) => {
  const userID = req.params.userID;
  getCostAndID(userID, res, (totalCost, basketItemID) => {
    res.json({ totalCost: totalCost, basketItemID: basketItemID });
  });
});

module.exports = app;
