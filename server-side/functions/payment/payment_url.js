const payment = "/payment";

const checkStock_url = payment + "/checkStock/:userID";

const checkPayment_url = payment + "/checkFund";

const getCostAndBaskID_url = payment + "/getCostAndBaskID/:userID";

const finalisePayment_url = payment + "/finalise";

module.exports = {
  checkStock_url,
  checkPayment_url,
  getCostAndBaskID_url,
  finalisePayment_url,
};
