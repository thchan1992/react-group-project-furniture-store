var express = require("express");
var app = express();
app.use(require("../../configuration/corsConf"));
const { getOne, getAll, runCom } = require("../../configuration/generalFunc");
const {
  regularJWT,
  adminJWT,
  checkUserID,
} = require("../../configuration/jwtConf");

const {
  salesRecord_sql,
  salesTotalCost_sql,
  salesReport_sql,
  salesSummary_sql,
} = require("./sales_sql");
const {
  salesRecord_url,
  salesTotalCost_url,
  salesReport_url,
  salesSummary_url,
} = require("./sales_url");

//get a list of sales record based on user
app.get(salesRecord_url, regularJWT, (req, res) => {
  const basketItemID = req.params.basketItemID;
  const userID = req.params.userID;
  checkUserID(req, res, userID, () => {
    getAll(salesRecord_sql, basketItemID, res);
  });
});

app.get(salesTotalCost_url, (req, res) => {
  const basketItemID = req.params.basketItemID;
  getOne(salesTotalCost_sql, basketItemID, res);
});

//Get a sales report within a specified range of dates
app.get(salesReport_url, adminJWT, (req, res) => {
  var sorting = req.params.sorting;
  var column = req.params.column;
  var dateTo = req.params.dateTo;
  var dateFrom = req.params.dateFrom;
  var params = [dateFrom, dateTo];
  getAll(salesReport_sql(column, sorting), params, res);
});

app.get(salesSummary_url, adminJWT, (req, res) => {
  var dateTo = req.params.dateTo;
  var dateFrom = req.params.dateFrom;
  var params = [dateTo, dateFrom];

  getAll(salesSummary_sql, params, res);
});

module.exports = app;
