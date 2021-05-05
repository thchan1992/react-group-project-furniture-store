var express = require("express");
var app = express();
app.use(require("../../configuration/corsConf"));
const { regularJWT, checkUserID } = require("../../configuration/jwtConf");

const {
  showBasket_url,
  deleteBasket_url,
  getBasketCost_url,
  editBasket_url,
  addBasketItem_url,
} = require("./basket_url");

const {
  showBasket_sql,
  deleteBasket_sql,
  getBasketCost_sql,
} = require("./basket_sql");

const { addBasketItem, editBasket } = require("./basket_func");
const { getAll, getOne, runCom } = require("../../configuration/generalFunc");

//show user basket
app.get(showBasket_url, regularJWT, (req, res) => {
  const userID = req.params.userID;
  console.log(userID);
  checkUserID(req, res, userID, () => {
    getAll(showBasket_sql, userID, res);
  });
});

//delete the whole basket item
app.delete(deleteBasket_url, regularJWT, (req, res) => {
  const userID = req.params.userID;
  checkUserID(req, res, userID, () => {
    runCom(deleteBasket_sql, userID, res, "Basket has been deleted");
  });
});

//get total cost of the basket
app.get(getBasketCost_url, regularJWT, (req, res) => {
  const userID = req.params.userID;
  checkUserID(req, res, userID, () => {
    getOne(getBasketCost_sql, userID, res);
  });
});

//update the basket item QTY
app.put(editBasket_url, regularJWT, (req, res) => {
  const itemBasketQty = req.body.itemBasketQty;
  const itemDetID = req.body.itemDetID;
  const userID = req.body.userID;
  checkUserID(req, res, userID, () => {
    editBasket(itemBasketQty, itemDetID, userID, res);
  });
});

//Add an item to the basket
app.put(addBasketItem_url, regularJWT, (req, res) => {
  const itemDetID = req.body.itemDetID;
  const userID = req.body.userID;
  const itemBasketQty = req.body.itemBasketQty;
  checkUserID(req, res, userID, () => {
    addBasketItem(itemDetID, userID, itemBasketQty, res);
  });
});

module.exports = app;
