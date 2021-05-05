var express = require("express");
var app = express();
app.use(require("../../configuration/corsConf"));
const { adminJWT } = require("../../configuration/jwtConf");
const { getOne, getAll, runCom } = require("../../configuration/generalFunc");
var db = require("../../database/database.js");

const {
  fetchSuppList_sql,
  editSupplier_sql,
  fetchSuppDet_sql,
  addSupplier_sql,
  getOrdHistory_sql,
} = require("./supplier_sql");

const {
  fetchSuppList_url,
  editSupplier_url,
  fetchSuppDet_url,
  addSupplier_url,
  addNewSuppOrd_url,
  getOrdHistory_url,
} = require("./supplier_url");

const { addNewSuppOrd } = require("./supplier_func");

app.get(fetchSuppList_url, adminJWT, (req, res) => {
  getAll(fetchSuppList_sql, null, res);
});

app.put(editSupplier_url, adminJWT, (req, res) => {
  var column = req.body.column;
  var suppID = req.body.suppID;
  var change = req.body.change;
  runCom(
    editSupplier_sql(column),
    [change, suppID],
    res,
    "The supplier detail has been updated"
  );
});

// Fetch the details of a specific supplier
app.get(fetchSuppDet_url, (req, res) => {
  var suppID = req.params.suppID;
  getOne(fetchSuppDet_sql, suppID, res);
});

//add new supplier
app.post(addSupplier_url, adminJWT, (req, res) => {
  var suppID = req.body.suppID;
  var suppName = req.body.suppName;
  var suppEmail = req.body.suppEmail;
  runCom(
    addSupplier_sql,
    [suppID, suppName, suppEmail],
    res,
    "The new supplier has been added"
  );
});

//add new supplier order
app.post(addNewSuppOrd_url, adminJWT, (req, res) => {
  addNewSuppOrd(req, res);
});

// Fetch a list of all the orders made to the suppliers (orders history)
app.post(getOrdHistory_url, adminJWT, (req, res) => {
  const params = [req.body.dateFrom, req.body.dateTo];
  console.log(params);
  getAll(getOrdHistory_sql(req.body.sorting), params, res);
});

module.exports = app;
