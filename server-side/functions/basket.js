var express = require("express");
var app = express();
var db = require("./../database/database.js");
app.use(require("../configuration/corsConf"));
var jwt = require("jsonwebtoken");
const { regularJWT, adminJWT } = require("../configuration/jwtConf");
const { addBasketItem } = require("./basketUtility");

//show basket with the itemDet
app.get("/basket/:userID", (req, res) => {
  const sql =
    "SELECT basketItemID, basket.itemDetID, itemQty, itemBasketQty, basket.itemPrice, itemName, itemUrl, CASE WHEN itemQty = 0 THEN 'Out of Stock' WHEN itemQty >= itemBasketQty THEN 'Available' WHEN itemBasketQty > itemQty THEN 'Please reduce the QTY' WHEN itemBasketQty > 5 THEN 'Please reduce the QTY' ELSE 'err' END status FROM basket INNER JOIN itemDetails ON Basket.itemDetID = itemDetails.itemDetID WHERE userID = ?";
  const userID = req.params.userID;
  db.all(sql, userID, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ result });
  });
});

//delete the whole basket item
app.delete("/basket/delete/:userID", (req, res) => {
  const userID = req.params.userID;
  db.run("DELETE FROM basket WHERE userID = ?", userID, (err) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ message: "done" });
  });
});

//update the basket item QTY
app.put("/basket/editBasket", (req, res) => {
  const itemBasketQty = req.body.itemBasketQty;
  const itemDetID = req.body.itemDetID;
  const userID = req.body.userID;
  if (itemBasketQty == 0) {
    db.run(
      "DELETE FROM basket WHERE itemDetID = ? AND userID = ?",
      [itemDetID, userID],
      (err) => {
        if (err) {
          res.json({ error: err.message });
          return;
        }
        res.json({ message: "Item has been removed from the basket" });
      }
    );
  } else if (itemBasketQty > 10) {
    res.json({ message: "Cannot be greater than 10" });
  } else {
    db.run(
      "UPDATE basket SET itemBasketQty = ? WHERE itemDetID =? AND userID =?",
      [itemBasketQty, itemDetID, userID],
      (err) => {
        if (err) {
          res.json({ error: err.message });
          return;
        }
        res.json({ message: "Item has been updated in the basket" });
      }
    );
  }
});

app.get("/basket/totalCost/:userID", async (req, res) => {
  const userID = req.params.userID;
  db.get(
    "select sum(itemPrice * itemBasketQty) AS totalCost from basket group by userID having userID =?",
    userID,
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
      }
      res.json({ result: result });
    }
  );
});

//Add an item to the basket
// get itemDetID, userID,itemBasketQty
//step 1: use itemDetID to get all the item detail
//step 2: checck whether user has a basket
//step 3: use userID to check wether there is a exisiting basket in the method
//step 4: if user got a basket, add the item qty number to the basket
//step 5: if user has not got a basket, create one, then add item to the basket
app.put("/basket/addBasketItem", async (req, res) => {
  const itemDetID = req.body.itemDetID;
  const userID = req.body.userID;
  const itemBasketQty = req.body.itemBasketQty;
  addBasketItem(itemDetID, userID, itemBasketQty, res);
});

module.exports = app;
