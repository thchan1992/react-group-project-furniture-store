const supplier = "/suppliers";

const fetchSuppList_url = supplier + "/";

const editSupplier_url = supplier + "/edit/";

const fetchSuppDet_url = supplier + "/:suppID";

const addSupplier_url = supplier + "/addSupplier";

const addNewSuppOrd_url = supplier + "/newOrder";

const getOrdHistory_url = supplier + "/ordersHistory";

module.exports = {
  fetchSuppList_url,
  editSupplier_url,
  fetchSuppDet_url,
  addSupplier_url,
  addNewSuppOrd_url,
  getOrdHistory_url,
};
