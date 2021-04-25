const checkPayment_sql =
  "select * from payMentDetail WHERE funds >= ? AND userID = ?";

const checkStock_sql =
  "select (itemQty - itemBasketQty) AS Qty FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID WHERE Qty < 0 AND userID = ?";

const createSales_sql =
  "INSERT INTO sales (itemDetID, itemCatID, userID, basketItemID, itemBasketQty, itemPrice) SELECT itemDetID, itemCatID, userID, basketItemID, itemBasketQty, itemPrice FROM basket WHERE userID = ?";

const reverseStock_sql =
  "UPDATE itemDetails AS i SET itemQty = i.itemQty + COALESCE((SELECT SUM(b.itemBasketQty) FROM basket b WHERE b.userID = ? AND b.itemDetID = i.itemDetID),0)";

const getCostAndBaskID_sql =
  "select SUM(itemPrice*itemBasketQty) AS totalCost,basketItemID from basket group by userID having userID =?";

const updateBasketDate_sql =
  " UPDATE sales SET orderDate = ?, deliveryDate = ?, delivAddress = ? WHERE basketItemID = ?";

const reverSales_sql = "DELETE FROM sales WHERE basketItemID=?";

const reduceFunds_sql = (totalCost) => {
  return (
    "UPDATE paymentDetail SET funds = funds-" + totalCost + " WHERE userID = ?"
  );
};

const updateStockLevel_sql =
  "UPDATE itemDetails AS i SET itemQty = i.itemQty - COALESCE((SELECT SUM(b.itemBasketQty) FROM basket b WHERE b.userID = ? AND b.itemDetID = i.itemDetID),0)";

const reverFund_sql = (totalCost) => {
  return (
    "UPDATE paymentDetail SET funds = funds+" + totalCost + " WHERE userID =?"
  );
};

const deleteBasket_sql = "DELETE from sales WHERE basketItemID =?";

module.exports = {
  checkPayment_sql,
  checkStock_sql,
  createSales_sql,
  reverseStock_sql,
  deleteBasket_sql,
  getCostAndBaskID_sql,
  updateBasketDate_sql,
  reverSales_sql,
  reduceFunds_sql,
  updateStockLevel_sql,
  reverFund_sql,
};
