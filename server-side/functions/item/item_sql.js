const showCater_sql = "SELECT * FROM itemCategory";

const showItemDet_sql =
  "select itemUrl, itemDetID, itemDetails.itemCatID, itemPrice, itemThreshold, itemQty, itemName, itemDesp, suppliers.suppID, suppName, itemCatName from itemDetails inner join itemCategory on itemCategory.itemCatID = itemDetails.itemCatID inner join suppliers on suppliers.suppID = itemDetails.suppID where itemDetID =?";

const updateItemDet_sql = (column) => {
  return `UPDATE itemDetails SET ${column} = ? WHERE itemDetID = ?`;
};

const checkThreshold_sql =
  "select basket.itemDetID, basket.itemCatID FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID WHERE userID = ? AND itemQty - itemBasketQty <= itemThreshold";

const updateItemCat_sql = (column) => {
  return `UPDATE itemCategory SET ${column} = ? WHERE itemCatID = ?`;
};

const addItemCategory_sql =
  "INSERT INTO itemCategory (itemCatID, itemCatName) VALUES (?, ?)";

const fetchItemList_sql = (column, sorting) => {
  return (
    "SELECT DISTINCT itemDetails.itemDetID, itemDetails.itemCatID, itemPrice, itemThreshold, itemQty, itemName, itemDesp, suppliers.suppID, suppName, itemCategory.itemCatID, itemCatName, itemUrl FROM itemDetails INNER JOIN itemCategory ON itemCategory.itemCatID = itemDetails.itemCatID INNER JOIN suppOrder ON itemDetails.itemDetID = suppOrder.itemDetID INNER JOIN suppliers ON suppOrder.suppID = suppliers.suppID WHERE itemCatName = ? ORDER BY " +
    column +
    " " +
    sorting
  );
};

const fetchSearchItemList_sql = (column, sorting) => {
  return (
    "SELECT DISTINCT itemDetails.itemDetID, itemDetails.itemCatID, itemPrice, itemThreshold, itemQty, itemName, itemDesp, suppliers.suppID, suppName, itemCategory.itemCatID, itemCatName, itemUrl FROM itemDetails INNER JOIN itemCategory ON itemCategory.itemCatID = itemDetails.itemCatID INNER JOIN suppOrder ON itemDetails.itemDetID = suppOrder.itemDetID INNER JOIN suppliers ON suppOrder.suppID = suppliers.suppID WHERE itemName LIKE ? ORDER BY " +
    column +
    " " +
    sorting
  );
};

const addNewItem_sql =
  "INSERT INTO itemDetails (itemDetID, itemCatID, itemPrice, itemThreshold, itemQty, itemName, itemDesp, itemUrl, suppID) VALUES (?,?,?,?,?,?,?,?,?)";

const fetchItemDetUrl_sql =
  "SELECT itemUrl FROM itemDetails WHERE itemDetID = ?";

const setImageUrl_sql =
  "UPDATE itemDetails SET itemUrl = ? WHERE itemDetID = ?";

module.exports = {
  showCater_sql,
  showItemDet_sql,
  updateItemDet_sql,
  updateItemCat_sql,
  checkThreshold_sql,
  addItemCategory_sql,
  fetchItemList_sql,
  fetchSearchItemList_sql,
  addNewItem_sql,
  fetchItemDetUrl_sql,
  setImageUrl_sql,
};
