const salesRecord_sql =
  "SELECT sales.itemDetID, sales.itemPrice, itemBasketQty, deliveryDate, orderDate, basketItemID, itemName, itemUrl from sales INNER JOIN itemDetails ON sales.itemDetID = itemDetails.itemDetID WHERE basketItemID = ?";

const salesTotalCost_sql =
  "SELECT SUM(itemPrice*itemBasketQty) AS totalCost FROM sales GROUP BY basketItemID HAVING basketItemID = ?";

const salesReport_sql = (column, sorting) => {
  return (
    "SELECT * FROM sales WHERE orderDate BETWEEN ? AND ? ORDER BY " +
    column +
    " " +
    sorting
  );
};

const salesSummary_sql =
  "select sum(itemPrice * itemBasketQty) AS sales, orderDate from sales group by orderDate having orderDate BETWEEN ? AND ? ORDER BY orderDate";

module.exports = {
  salesRecord_sql,
  salesTotalCost_sql,
  salesReport_sql,
  salesSummary_sql,
};
