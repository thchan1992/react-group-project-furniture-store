var express = require("express");
var app = express();
var db = require("./../database/database.js");
app.use(require("../configuration/corsConf"));
var jwt = require("jsonwebtoken");
const { regularJWT, adminJWT } = require("../configuration/jwtConf");

app.get("/sales/:basketItemID/:userID", (req, res) => {
  const basketItemID = req.params.basketItemID;
  db.all(
    "SELECT sales.itemDetID, sales.itemPrice, itemBasketQty, deliveryDate, orderDate, basketItemID, itemName, itemUrl from sales INNER JOIN itemDetails ON sales.itemDetID = itemDetails.itemDetID WHERE basketItemID = ?",
    basketItemID,
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ result });
    }
  );
});

app.get("/sales/totalCost/:basketItemID/:userID", (req, res) => {
  const basketItemID = req.params.basketItemID;
  db.get(
    "SELECT SUM(itemPrice*itemBasketQty) AS totalCost FROM sales GROUP BY basketItemID HAVING basketItemID = ?",
    basketItemID,
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ result });
    }
  );
});

//Get a sales report within a specified range of dates
app.get("/sales/report/:sorting/:column/:dateFrom/:dateTo", (req, res) => {
  var sorting = req.params.sorting;
  var column = req.params.column;
  var dateTo = req.params.dateTo;
  var dateFrom = req.params.dateFrom;
  var params = [dateFrom, dateTo];
  var sql =
    "SELECT * FROM sales WHERE orderDate BETWEEN ? AND ? ORDER BY " +
    column +
    " " +
    sorting;

  
  db.all(sql, params, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ result });
  });
});

module.exports = app;
