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
const { autoMail_func } = require("../email/email.js");

//function that finalise the payment and order of the user
const finalisePay = (userID, deliveryDate, orderDate, delivAddress, res) => {
  //get the total cost of the basket and basket ID
  getCostAndID(userID, res, (totalCost, basketItemID) => {
    //reduce the funds from the user
    reduceFunds(totalCost, userID, res, (isAuthed) => {
      if (isAuthed == true) {
        //update the itemQty in the stock according to the user's basket
        updateStockLevel(userID, totalCost, res, (isAuthed) => {
          if (isAuthed == true) {
            const refund = totalCost;
            //create sales: copy whatever users have in the basket to the sales table
            createSales(refund, basketItemID, userID, res, (isAuthed) => {
              if (isAuthed == true) {
                //update order date in the sales table
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
                      //check if the item meets the item threshold, if yes, send email to the supplier
                      autoMail_func(userID);
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

//functions that create the sales
const createSales = (refund, basketItemID, userID, res, callback) => {
  db.run(createSales_sql, userID, (err) => {
    if (err) {
      //error handler: refund the func to the users and reverse the stock level
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

//get the total cost and basket ID
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

//update the order date in the sales table
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
      //error handler: refund the func to the users and reverse the stock level, and delete the sales record
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

//error handler that reverse the stocks to the item table
const reverSales = (basketItemID, res) => {
  db.run(reverSales_sql, basketItemID, (err) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
  });
};

//functions that takes user fund
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

//update the stock level after taking money from the users
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

//error handle that return the money to the user account
const reverFund = (userID, totalCost, res) => {
  db.run(reverFund_sql(totalCost), userID);
};

//
//check if users have enough money before finalising the order
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

//check if the stock level is enough for user order before finalising the order
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
