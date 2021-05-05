var express = require("express");
var app = express();
app.use(require("../../configuration/corsConf"));
const { adminJWT } = require("../../configuration/jwtConf");

const {
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
  setImageUrl_url,
} = require("./item_url");

const {
  showCater_sql,
  showItemDet_sql,
  updateItemDet_sql,
  checkThreshold_sql,
  updateItemCat_sql,
  addItemCategory_sql,
  fetchItemList_sql,
  fetchSearchItemList_sql,
  addNewItem_sql,
  fetchItemDetUrl_sql,
  setImageUrl_sql,
} = require("./item_sql");

const { getAll, getOne, runCom, uploadImg, deleteImg } = require("./item_func");

//show item detail
app.get(showItemDet_url, (req, res) => {
  const itemDetID = req.params.itemDetID;
  getOne(showItemDet_sql, itemDetID, res);
});

//fetch a list of item category
app.get(showCater_url, (req, res) => {
  getAll(showCater_sql, null, res);
});

//edit an item category
app.put(updateItemCat_url, adminJWT, (req, res) => {
  var column = req.body.column;
  var itemCatID = req.body.itemCatID;
  var change = req.body.change;
  var params = [change, itemCatID];
  runCom(
    updateItemCat_sql(column),
    params,
    res,
    "The category detail has been updated"
  );
});

//update a item detail
app.put(updateItemDet_url, adminJWT, (req, res) => {
  var column = req.body.column;
  var itemDetID = req.body.itemDetID;
  var change = req.body.change;
  var params = [change, itemDetID];
  runCom(updateItemDet_sql(column), params, res, "Item has been updated");
});

//check Item threshold
app.get(checkThreshold_url, (req, res) => {
  var userID = req.params.userID;
  getAll(checkThreshold_sql, userID, res);
});

// Create a new category
app.post(addItemCategory_url, adminJWT, (req, res) => {
  const itemCatID = req.body.itemCatID;
  const itemCatName = req.body.itemCatName;
  var params = [itemCatID, itemCatName];
  runCom(addItemCategory_sql, params, res, "Category successfully added!");
});

//fetch a list of furniture
app.get(fetchItemList_url, (req, res) => {
  var sorting = req.params.sorting;
  var column = req.params.column;
  var itemCatName = req.params.itemCatName;
  getAll(fetchItemList_sql(column, sorting), itemCatName, res);
});

//A search item API
app.get(fetchSearchItemList_url, (req, res) => {
  var sorting = req.params.sorting;
  var column = req.params.column;
  var keyword = "%" + req.params.keyword + "%";
  getAll(fetchSearchItemList_sql(column, sorting), keyword, res);
});

//API request to add the item
const { addNewSuppOrd } = require("../supplier/supplier_func");
//function that add a new item
app.post(addNewItem_url, adminJWT, (req, res) => {
  const itemDetID = req.body.itemDetID;
  const itemCatID = req.body.itemCatID;
  const itemPrice = req.body.itemPrice;
  const itemThreshold = req.body.itemThreshold;
  const itemQty = req.body.itemQty;
  const itemName = req.body.itemName;
  const itemDesp = req.body.itemDesp;
  const itemUrl = req.body.itemUrl;
  const suppID = req.body.suppID;
  var params = [
    itemDetID,
    itemCatID,
    itemPrice,
    itemThreshold,
    itemQty,
    itemName,
    itemDesp,
    itemUrl,
    suppID,
  ];
  runCom(addNewItem_sql, params, res, "New Item has been added");
  addNewSuppOrd(req, res);
});

//API request to upload the Image of the product *merge the func below
app.post(addItemImg_url, adminJWT, uploadImg.single("image"), (req, res) => {
  const fileName = req.file.filename;
  //send the file name to the front end
  res.json({ fileName: fileName });
});

//delete the item picture in the backend
app.delete(fetchItemDetUrl_url, adminJWT, (req, res) => {
  const params = req.params.itemDetID;
  deleteImg(fetchItemDetUrl_sql, params, res);
});

//update the url of the item in the table
app.post(setImageUrl_url, adminJWT, (req, res) => {
  runCom(
    setImageUrl_sql,
    [req.body.itemUrl, req.body.itemDetID],
    res,
    "Item Picture updated"
  );
});

module.exports = app;
