const checkThreshold_sql =
  "Select itemDetails.itemDetID, itemDetails.itemCatID, itemName, suppliers.suppID, suppName, suppEmail from itemDetails INNER JOIN suppliers ON suppliers.suppID = itemDetails.suppID INNER JOIN basket ON itemDetails.itemDetID = basket.itemDetID where itemQTY <= itemThreshold AND userID = ?";

const addNewSuppOrd_sql =
  "INSERT INTO suppOrder (suppOrdID, suppID, itemDetID, itemCatID, suppOrdQty, orderDate, ordReceiveDate) VALUES (?, ?, ?, ?, ?, ?, ?)";

const updateStock_sql =
  "UPDATE itemDetails SET itemQty = itemQty + 100 WHERE itemDetID = ?";

module.exports = { checkThreshold_sql, addNewSuppOrd_sql, updateStock_sql };
