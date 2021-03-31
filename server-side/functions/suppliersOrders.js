var cors = require("cors");
var express = require("express");
var bodyParser = require("body-parser");
var db = require("../database/database.js");
var app = express();
var bcrypt = require("bcrypt");
var saltRounds = 10;
app.use(bodyParser.json());
app.use(cors());
app.use(require("../configuration/corsConf"));
const { regularJWT, adminJWT } = require("../configuration/jwtConf");

app.post("/suppliers/newOrder", (req, res) => {
  const suppOrdID = req.body.suppOrdID;
  const suppID = req.body.suppID;
  const itemDetID = req.body.itemDetID;
  const itemCatID = req.body.itemCatID;
  const suppOrdQty = req.body.suppOrdQty;
  const orderDate = req.body.orderDate;
  const ordReceiveDate = req.body.ordReceiveDate;
  var params = [
    suppOrdID,
    suppID,
    itemDetID,
    itemCatID,
    suppOrdQty,
    orderDate,
    ordReceiveDate,
  ];

  db.all(
    "INSERT INTO suppOrder (suppOrdID, suppID, itemDetID, itemCatID, suppOrdQty, orderDate, ordReceiveDate) VALUES (?, ?, ?, ?, ?, ?, ?)",
    params,
    (err) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({
        message: "Order %ID%".replace("%ID%", suppOrdID) + " has been sent!",
      });
    }
  );
});

// Fetch a list of all the orders made to the suppliers (orders history)
app.get("/suppliers/orderHistory", (req, res) => {
  db.all("SELECT * FROM suppOrder", (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ result });
  });
});

// Fetch the details of a specific order
app.get("/suppliers/orderHistory/:suppOrdID", (req, res) => {
  var suppOrdID = req.params.suppOrdID;
  db.all(
    "SELECT * FROM suppOrder WHERE suppOrdID = ?",
    suppOrdID,
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ result });
    }
  );
});

//Update the receive date
app.put("/suppliers/orderReceived", (req, res) => {
  var suppOrdID = req.body.suppOrdID;
  var change = req.body.change;
  var params = [change, suppOrdID];

  db.all(
    `UPDATE suppOrder SET ordReceiveDate = ? WHERE suppOrdID = ?`,
    params,
    (err) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({
        message: "Date updated.",
      });
    }
  );
});

app.put("/suppliers/updateStock", (req, res) => {
  var ordReceiveDate = req.body.ordReceiveDate;
  var suppOrdID = req.body.suppOrdID;
  var suppParams = [ordReceiveDate, suppOrdID];
  console.log(suppParams);
  var itemDetID = req.body.itemDetID;
  var itemQty = parseInt(req.body.itemQty);
  var suppOrdQty = parseInt(req.body.suppOrdQty);
  var newQty = itemQty + suppOrdQty;
  var itemParams = [newQty, itemDetID];
  console.log(itemParams);
  db.run(
    "UPDATE suppOrder SET ordReceiveDate = ? WHERE suppOrdID = ?",
    suppParams,
    (err) => {
      if (err) {
        res.json({ error: err.message });
        return;
      } else {
        db.run(
          "UPDATE itemDetails SET itemQty = ? WHERE itemDetID =?",
          itemParams,
          (err) => {
            if (err) {
              res.json({ error: err.message });
              return;
            } else {
              res.json({ message: "Date updated." });
            }
          }
        );
      }
    }
  );
});

module.exports = app;
