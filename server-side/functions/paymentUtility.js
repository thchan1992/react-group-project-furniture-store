var db = require("./../database/database.js");

const finalisePay = (userID, deliveryDate, orderDate, delivAddress, res) => {
  //get the total cost of the basket and basket ID
  getCostAndID(userID, res, (totalCost, basketItemID) => {
    //reduce the fund
    reduceFunds(totalCost, userID, res, (tf) => {
      if (tf == true) {
        //update the itemQty in the stock
        updateItemQty(userID, totalCost, res, (tf) => {
          if (tf == true) {
            //create sales
            const refund = totalCost;
            createSales(
              refund,
              basketItemID,
              userID,

              res,
              (tf) => {
                if (tf == true) {
                  updateBasketDate(
                    refund,
                    basketItemID,
                    userID,
                    deliveryDate,
                    orderDate,
                    delivAddress,
                    res,
                    (tf) => {
                      if (tf == true) {
                        res.json({ message: "Order done", result: true });
                        return;
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    });
  });
};

const createSales = (refund, basketItemID, userID, res, callback) => {
  db.run(
    "INSERT INTO sales (itemDetID, itemCatID, userID, basketItemID, itemBasketQty, itemPrice) SELECT itemDetID, itemCatID, userID, basketItemID, itemBasketQty, itemPrice FROM basket WHERE userID = ?",
    userID,
    (err) => {
      if (err) {
        reverseStock(basketItemID, userID, res);
        reverFund(userID, refund, res);
        res.json({
          error: err.message,
          message: "Server gone down, we have refunded your money.",
        });
        return;
      }
      callback(true);
    }
  );
};

//reverse stock level
const reverseStock = (basketItemID, userID, res) => {
  db.run(
    "UPDATE itemDetails AS i SET itemQty = i.itemQty + COALESCE((SELECT SUM(b.itemBasketQty) FROM basket b WHERE b.userID = ? AND b.itemDetID = i.itemDetID),0)",
    userID
  );
  db.run("DELETE from sales WHERE basketItemID =?", basketItemID);
};

const getCostAndID = (userID, res, callback) => {
  db.get(
    "select SUM(itemPrice*itemBasketQty) AS totalCost,basketItemID from basket group by userID having userID =?",
    userID,
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      } else {
        if (result) {
          callback(result.totalCost, result.basketItemID);
        } else {
          res.json({ message: "no result found" });
          return;
        }
      }
    }
  );
};

const updateBasketDate = (
  refund,
  basketItemID,
  userID,
  deliveryDate,
  orderDate,
  delivAddress,
  res,
  callback
) => {
  const params = [orderDate, deliveryDate, delivAddress, basketItemID];
  db.run(
    " UPDATE sales SET orderDate = ?, deliveryDate = ?, delivAddress = ? WHERE basketItemID = ?",
    params,
    (err) => {
      if (err) {
        reverseStock(basketItemID, userID, res);
        reverFund(userID, refund, res);
        reverSales(basketItemID, res);
        res.json({
          error: err.message,
          message: "Server gone down, we have refunded your money.",
        });
        return;
      }
      callback(true);
    }
  );
};

const reverSales = (basketItemID, res) => {
  db.run("DELETE FROM sales WHERE basketItemID=?", basketItemID, (err) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
  });
};

const reduceFunds = (totalCost, userID, res, callback) => {
  db.run(
    "UPDATE paymentDetail SET funds = funds-" + totalCost + " WHERE userID = ?",
    userID,
    (err) => {
      if (err) {
        if (
          err.message ==
          "SQLITE_CONSTRAINT: CHECK constraint failed: funds >= 0"
        ) {
          res.json({ message: "You do not have enough money." });
          return;
        } else {
          res.json({ error: err.message, code: 1 });
          return;
        }
      }
      callback(true);
    }
  );
};

const updateItemQty = (userID, totalCost, res, callback) => {
  db.run(
    "UPDATE itemDetails AS i SET itemQty = i.itemQty - COALESCE((SELECT SUM(b.itemBasketQty) FROM basket b WHERE b.userID = ? AND b.itemDetID = i.itemDetID),0)",
    userID,
    (err) => {
      if (err) {
        if (
          err.message ==
          "SQLITE_CONSTRAINT: CHECK constraint failed: itemQty >= 0"
        ) {
          reverFund(userID, totalCost, res);
          res.json({
            message: "some item out of stock, we have refunded",
            code: 2,
          });
          return;
        } else {
          res.json({ error: err.message, code: 3 });
          return;
        }
      }
      callback(true);
    }
  );
};

const reverFund = (userID, totalCost, res) => {
  db.run(
    "UPDATE paymentDetail SET funds = funds+" + totalCost + " WHERE userID =?",
    userID
  );
};

module.exports = {
  finalisePay,
  getCostAndID,
};
