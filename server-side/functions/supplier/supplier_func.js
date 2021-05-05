var db = require("../../database/database.js");
const { sendAutoOrder } = require("../email/email.js");
const { createSuppOrder_sql, getSuppDet_sql } = require("./supplier_sql");

//add a new supplier order
const addNewSuppOrd = (req, res) => {
  const suppOrdID = req.body.suppOrdID;
  const suppID = req.body.suppID;
  const itemDetID = req.body.itemDetID;
  const itemCatID = req.body.itemCatID;
  const suppOrdQty = req.body.suppOrdQty;
  const orderDate = req.body.orderDate;
  const ordReceiveDate = req.body.ordReceiveDate;
  const itemName = req.body.itemName;
  //send a email to the supplier email
  getSuppDet(suppID, (supplier) => {
    sendAutoOrder(supplier.suppEmail, supplier.suppName, itemName, suppOrdQty);
  });
  var params = [
    suppOrdID,
    suppID,
    itemDetID,
    itemCatID,
    suppOrdQty,
    orderDate,
    ordReceiveDate,
  ];

  db.run(createSuppOrder_sql, params, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

//functions that return supplier detail
const getSuppDet = (suppID, callback) => {
  db.get(getSuppDet_sql, suppID, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    callback(result);
  });
};

module.exports = { addNewSuppOrd };
