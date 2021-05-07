const fetchUserDet_sql = "SELECT * FROM userDetail WHERE userID = ?";

const updateUserPass_sql = "UPDATE userDetail set userPass = ? where userID =?";

const updateUserDet_sql = (column) => {
  return `UPDATE userDetail SET ${column} = ? WHERE userID = ?`;
};

const fetchUserCard_sql = "SELECT * FROM paymentDetail WHERE userID = ?";

const updateUserCard_sql =
  "UPDATE paymentDetail SET payMetID = ?, cardNumber = ?, expire_Date = ?, ccv = ?, funds =? Where userID = ?";

const getUserOrdList_sql =
  "SELECT basketItemID, orderDate, deliveryDate, itemPrice*itemBasketQty AS cost FROM sales WHERE userID = ?";

const orderConfirmation_sql =
  "SELECT sales.itemDetID, sales.itemPrice, itemBasketQty, deliveryDate, orderDate, basketItemID, itemName, itemUrl from sales INNER JOIN itemDetails ON sales.itemDetID = itemDetails.itemDetID WHERE basketItemID = ?";

const getOrdHist_sql = (sorting) => {
  return (
    "SELECT userID, basketItemID, SUM(sales.itemPrice*itemBasketQty) AS totalCost, deliveryDate, orderDate from sales INNER JOIN itemDetails ON itemDetails.itemDetID = sales.itemDetID group by basketItemID having userID=? ORDER BY orderDate " +
    sorting
  );
};

module.exports = {
  fetchUserDet_sql,
  updateUserPass_sql,
  updateUserDet_sql,
  fetchUserCard_sql,
  updateUserCard_sql,
  getUserOrdList_sql,
  orderConfirmation_sql,
  getOrdHist_sql,
};
