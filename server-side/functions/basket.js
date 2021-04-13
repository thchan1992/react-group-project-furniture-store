var express = require("express");
var app = express();
var db = require("./../database/database.js");
app.use(require("../configuration/corsConf"));
var jwt = require("jsonwebtoken");
const { regularJWT, adminJWT } = require("../configuration/jwtConf");

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
  if (itemBasketQty > 10) {
    res.json({ message: "quanity cannot be greater than 10" });
    return;
  }
  //get the item detail
  await fetchItemDet(itemDetID, res, itemBasketQty, async (itemDet) => {
    //get the basket ID
    await getBasket(
      userID,
      itemDetID,
      res,
      async (basketItemID, curBaskQty) => {
        //check if the user has the same product in their basket
        await checkExistItem(userID, itemDetID, res, (tf) => {
          //if yes, update the itemQty only
          if (tf == true) {
            const newBasQty = Number(itemBasketQty) + Number(curBaskQty);
            console.log(itemDet.itemQty);
            //either new basket qty is bigger than 10 or the new basQty is already bigger than the item stock, it will ask user to reduce the limit.
            if (newBasQty > 10 || newBasQty > itemDet.itemQty) {
              res.json({
                message:
                  "Over the qty limit or we simply do not have enough stock for this order. please reduce the item quantity",
              });
              return;
            }

            updateBasketItem(newBasQty, userID, itemDetID, res);
          } else {
            //if no, add an item to the basket
            const params = [
              itemDetID,
              itemDet.itemCatID,
              userID,
              basketItemID,
              itemBasketQty,
              itemDet.itemPrice,
            ];
            addBasketItem(params, res);
          }
        });
      }
    );
  });
});

const fetchItemDet = (itemDetID, res, itemBasketQty, callback) => {
  db.get(
    "SELECT * FROM itemDetails WHERE itemDetID = ?",
    itemDetID,
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      if (itemBasketQty > Number(result.itemQty)) {
        res.json({ message: "Please reduce the item QTY" });
        return;
      }

      callback(result);
    }
  );
};

const getBasket = (userID, itemDetID, res, callback) => {
  console.log(itemDetID);
  db.get(
    "SELECT basketItemID, itemBasketQty FROM basket WHERE userID = ? AND itemDetID =?",
    [userID, itemDetID],
    (err, result) => {
      console.log("1", result);
      //three situation:
      //1. user dont have basket nor product at all
      //2. user have basket with some product in the basket, and adding a same item to the basket
      //3. user have basket with some product in the basket, and adding a new item to the basket
      if (!result) {
        db.get(
          "SELECT basketItemID FROM basket WHERE userID =?",
          userID,
          (err, result) => {
            console.log("2", result);
            if (err) {
              res.json({ error: err.message });
              return;
            }
            if (!result) {
              //if users havent got a basket, create a new basket for the user
              const basketItemID = new Date().getTime();
              console.log(basketItemID);
              callback(basketItemID, null);
            } else {
              const basketItemID = result.basketItemID;
              const itemBasketQty = result.itemBasketQty;
              console.log(basketItemID);
              callback(basketItemID, itemBasketQty);
            }
          }
        );
      } else {
        //return the exisitng basket id
        const basketItemID = result.basketItemID;
        const itemBasketQty = result.itemBasketQty;
        console.log(basketItemID);
        callback(basketItemID, itemBasketQty);
      }
    }
  );
};

const checkExistItem = (userID, itemDetID, res, callback) => {
  const params = [userID, itemDetID];
  db.get(
    "SELECT * from basket WHERE userID = ? AND itemDetID = ?",
    params,
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      if (!result) {
        callback(false);
      } else {
        callback(true);
      }
    }
  );
};

const updateBasketItem = (itemBasketQty, userID, itemDetID, res) => {
  const params = [itemBasketQty, userID, itemDetID];

  db.run(
    "UPDATE basket SET itemBasketQty = ? WHERE userID = ? AND itemDetID = ?",
    params,
    (err) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ message: "item has been updated(1)" });
      return;
    }
  );
};

const addBasketItem = (params, res) => {
  db.run(
    "INSERT INTO basket (itemDetID, itemCatID, userID, basketItemID, itemBasketQty, itemPrice) VALUES(?, ?, ?, ?, ?, ?)",
    params,
    (err) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ message: "item has been added to the basket" });
    }
  );
};

module.exports = app;
