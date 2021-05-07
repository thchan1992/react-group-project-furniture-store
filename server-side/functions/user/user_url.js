const user = "/account";

const fetchUserDet_url = user + "/personalDetails/:userID";

const updateUserDet_url = user + "/personalDetails/edit";

const fetchUserCard_url = user + "/paymentDetails/:userID";

const updateUserCard_url = user + "/paymentEdit";

const getUserOrdList_url = user + "/orderHistory/:userID";

const orderConfirmation_url = user + "/order/History/:basketItemID/:userID";

const getOrdHist_url = user + "/userOrder/:userID/:sorting";

module.exports = {
  fetchUserDet_url,
  updateUserDet_url,
  fetchUserCard_url,
  updateUserCard_url,
  getUserOrdList_url,
  orderConfirmation_url,
  getOrdHist_url,
};
