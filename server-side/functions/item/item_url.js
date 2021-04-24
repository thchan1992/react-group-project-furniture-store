const item = "/item";

const fetchItemDetUrl_url = item + "/deletePic/:itemDetID";

const addItemImg_url = item + "/uploadImage/";

const addNewItem_url = item + "/addItem/";

const fetchSearchItemList_url = item + "/search/:sorting/:column/:keyword";

const fetchItemList_url = item + "/showItems/:sorting/:column/:itemCatName/";

const addItemCategory_url = item + "/addCater";

const checkThreshold_url = item + "/checkThreshold/:userID";

const updateItemDet_url = item + "/editProducts";

const updateItemCat_url = item + "/editCater/";

const showCater_url = item + "/showCater";

const showItemDet_url = item + "Detail/:itemDetID";

module.exports = {
  fetchItemDetUrl_url,
  addItemImg_url,
  addNewItem_url,
  fetchSearchItemList_url,
  fetchItemList_url,
  addItemCategory_url,
  checkThreshold_url,
  updateItemDet_url,
  updateItemCat_url,
  showCater_url,
  showItemDet_url,
};
