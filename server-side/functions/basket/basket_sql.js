const showBasket_sql =
  "SELECT basketItemID, basket.itemDetID, itemQty, itemBasketQty, basket.itemPrice, itemName, itemUrl, CASE WHEN itemQty = 0 THEN 'Out of Stock' WHEN itemQty >= itemBasketQty THEN 'Available' WHEN itemBasketQty > itemQty THEN 'Please reduce the QTY' WHEN itemBasketQty > 5 THEN 'Please reduce the QTY' ELSE 'err' END status FROM basket INNER JOIN itemDetails ON Basket.itemDetID = itemDetails.itemDetID WHERE userID = ?";

const deleteBasket_sql = "DELETE FROM basket WHERE userID = ?";

const getBasketCost_sql =
  "select sum(itemPrice * itemBasketQty) AS totalCost from basket group by userID having userID =?";

const deleteBasketItem_sql =
  "DELETE FROM basket WHERE itemDetID = ? AND userID = ?";

const updateBasketItem_sql =
  "UPDATE basket SET itemBasketQty = ? WHERE itemDetID =? AND userID =?";

const addBasketItem_sql =
  "INSERT INTO basket (itemDetID, itemCatID, userID, basketItemID, itemBasketQty, itemPrice) VALUES(?, ?, ?, ?, ?, ?)";

const fetchBasketItem_sql =
  "SELECT * from basket WHERE userID = ? AND itemDetID = ?";

const getBasketID_sql = "SELECT basketItemID FROM basket WHERE userID =?";

const getBasketIDQty_sql =
  "SELECT basketItemID, itemBasketQty FROM basket WHERE userID = ? AND itemDetID =?";

const getItemDet_sql = "SELECT * FROM itemDetails WHERE itemDetID = ?";

module.exports = {
  showBasket_sql,
  deleteBasket_sql,
  getBasketCost_sql,
  deleteBasketItem_sql,
  updateBasketItem_sql,
  addBasketItem_sql,
  fetchBasketItem_sql,
  getBasketID_sql,
  getBasketIDQty_sql,
  getItemDet_sql,
};
