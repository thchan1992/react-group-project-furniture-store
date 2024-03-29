const fetchSuppList_sql = "SELECT * FROM suppliers";

const editSupplier_sql = (column) => {
  return `UPDATE suppliers SET ${column} = ? WHERE suppID = ?`;
};

const fetchSuppDet_sql = "SELECT * FROM suppliers WHERE suppID = ?";

const addSupplier_sql =
  "INSERT INTO suppliers (suppID, suppName, suppEmail) VALUES (?, ?, ?)";

const getOrdHistory_sql = (sorting) => {
  return (
    "SELECT * FROM suppOrder WHERE orderDate BETWEEN ? AND ? ORDER BY orderDate " +
    sorting
  );
};

const createSuppOrder_sql =
  "INSERT INTO suppOrder (suppOrdID, suppID, itemDetID, itemCatID, suppOrdQty, orderDate, ordReceiveDate) VALUES (?, ?, ?, ?, ?, ?, ?)";

const getSuppDet_sql = "select * from suppliers where suppID = ?";

module.exports = {
  fetchSuppList_sql,
  editSupplier_sql,
  fetchSuppDet_sql,
  addSupplier_sql,
  getOrdHistory_sql,
  createSuppOrder_sql,
  getSuppDet_sql,
};
