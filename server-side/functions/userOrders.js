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

// Fetch a list of all the orders placed by a specific userID
app.get("/account/orderHistory/:userID", (req, res) => {
    const params = req.params.userID;
    var sql = "SELECT basketItemID, orderDate, deliveryDate, itemPrice*itemBasketQty AS cost FROM sales WHERE userID = ?";
    db.all(
      sql, params,
      (err, result) => {
        if (err) {
          res.json({ error: err.message });
          return;
        }
        res.json({ result });
      }
    );
  });

// Fetch the details of a specific order placed
app.get("/account/order/History/:basketItemID/:userID", (req, res) => {
    const basketItemID = req.params.basketItemID;
    var sql = "SELECT sales.itemDetID, sales.itemPrice, itemBasketQty, deliveryDate, orderDate, basketItemID, itemName, itemUrl from sales INNER JOIN itemDetails ON sales.itemDetID = itemDetails.itemDetID WHERE basketItemID = ?";
    
    db.all(sql, basketItemID,
      (err, result) => {
        if (err) {
          res.json({ error: err.message });
          return;
        }
        res.json({ result });
      }
    );
});
  
module.exports = app;