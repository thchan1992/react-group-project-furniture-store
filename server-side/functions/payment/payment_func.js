var db = require("../../database/database.js");
const {
  createSales_sql,
  reverseStock_sql,
  getCostAndBaskID_sql,
  updateBasketDate_sql,
  reverSales_sql,
  reduceFunds_sql,
  updateStockLevel_sql,
  deleteBasket_sql,
  reverFund_sql,
} = require("./payment_sql");

const finalisePay = (userID, deliveryDate, orderDate, delivAddress, res) => {
  //get the total cost of the basket and basket ID
  getCostAndID(userID, res, (totalCost, basketItemID) => {
    //reduce the fund
    reduceFunds(totalCost, userID, res, (isAuthed) => {
      if (isAuthed == true) {
        //update the itemQty in the stock
        updateStockLevel(userID, totalCost, res, (isAuthed) => {
          if (isAuthed == true) {
            //create sales
            const refund = totalCost;
            createSales(refund, basketItemID, userID, res, (isAuthed) => {
              if (isAuthed == true) {
                updateBasketDate(
                  refund,
                  basketItemID,
                  userID,
                  deliveryDate,
                  orderDate,
                  delivAddress,
                  res,
                  (isAuthed) => {
                    if (isAuthed == true) {
                      res.json({
                        message: "Order has been completed",
                        result: true,
                      });
                      return;
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  });
};

const createSales = (refund, basketItemID, userID, res, callback) => {
  db.run(createSales_sql, userID, (err) => {
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
  });
};

//reverse stock level
const reverseStock = (basketItemID, userID, res) => {
  db.run(reverseStock_sql, userID);
  db.run(deleteBasket_sql, basketItemID);
};

const getCostAndID = (userID, res, callback) => {
  db.get(getCostAndBaskID_sql, userID, (err, result) => {
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
  });
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
  db.run(updateBasketDate_sql, params, (err) => {
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
  });
};

const reverSales = (basketItemID, res) => {
  db.run(reverSales_sql, basketItemID, (err) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
  });
};

const reduceFunds = (totalCost, userID, res, callback) => {
  db.run(reduceFunds_sql(totalCost), userID, (err) => {
    if (err) {
      if (
        err.message == "SQLITE_CONSTRAINT: CHECK constraint failed: funds >= 0"
      ) {
        res.json({ message: "You do not have enough money." });
        return;
      } else {
        res.json({ error: err.message, code: 1 });
        return;
      }
    }
    callback(true);
  });
};

const updateStockLevel = (userID, totalCost, res, callback) => {
  db.run(updateStockLevel_sql, userID, (err) => {
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
  });
};

const reverFund = (userID, totalCost, res) => {
  db.run(reverFund_sql(totalCost), userID);
};

//----updated func
const checkFund = (sql, params, res) => {
  db.get(sql, params, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    if (!result) {
      res.json({ result: false });
    } else {
      res.json({ result: true });
    }
  });
};

const checkStock = (sql, userID, res) => {
  db.get(sql, userID, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    if (!result) {
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  });
};

module.exports = {
  finalisePay,
  getCostAndID,
  checkFund,
  checkStock,
};
