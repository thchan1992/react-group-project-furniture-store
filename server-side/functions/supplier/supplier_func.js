var db = require("../../database/database.js");
const { sendAutoOrder } = require("../email/email.js");

const addNewSuppOrd = (req, res) => {
  const suppOrdID = req.body.suppOrdID;
  const suppID = req.body.suppID;
  const itemDetID = req.body.itemDetID;
  const itemCatID = req.body.itemCatID;
  const suppOrdQty = req.body.suppOrdQty;
  const orderDate = req.body.orderDate;
  const ordReceiveDate = req.body.ordReceiveDate;
  const itemName = req.body.itemName;

  //send email
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

  db.all(
    "INSERT INTO suppOrder (suppOrdID, suppID, itemDetID, itemCatID, suppOrdQty, orderDate, ordReceiveDate) VALUES (?, ?, ?, ?, ?, ?, ?)",
    params,
    (err) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
    }
  );
};

//get supplier detail
const getSuppDet = (suppID, callback) => {
  db.get("select * from suppliers where suppID = ?", suppID, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(result);
  });
};

module.exports = { addNewSuppOrd };
