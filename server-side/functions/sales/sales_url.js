const sales = "/sales";

const salesRecord_url = sales + "/:basketItemID/:userID";

const salesTotalCost_url = sales + "/totalCost/:basketItemID/:userID";

const salesReport_url = sales + "/report/:sorting/:column/:dateFrom/:dateTo";

const salesSummary_url = sales + "/reportSummary/:dateTo/:dateFrom";

module.exports = {
  salesRecord_url,
  salesTotalCost_url,
  salesReport_url,
  salesSummary_url,
};
