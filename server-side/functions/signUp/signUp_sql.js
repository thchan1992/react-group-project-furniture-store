const signUpNewAcc_sql =
  "INSERT INTO userDetail (userID, userType, userEmail, firstName, lastName, userAddress, userPass) VALUES (?,?,?,?,?,?,?)";

const addNewPaymentDet_sql =
  "INSERT INTO paymentDetail (payMetID, cardNumber, userID, expire_Date, ccv, funds) VALUES (?,?,?,?,?,?)";

const signUpNewAdmin_sql =
  "INSERT INTO userDetail (userID, userType, userEmail, firstName, lastName, userAddress, userPass) VALUES (?,?,?,?,?,?,?)";

const showPayMet_sql = "SELECT * from paymentMethod";

const checkPayDet_sql = "SELECT * from paymentDetail WHERE cardNumber = ?";

module.exports = {
  signUpNewAcc_sql,
  addNewPaymentDet_sql,
  signUpNewAdmin_sql,
  showPayMet_sql,
  checkPayDet_sql,
};
