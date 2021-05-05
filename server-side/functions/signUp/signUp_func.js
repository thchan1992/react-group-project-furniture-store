var bcrypt = require("bcrypt");
var saltRounds = 10;
var db = require("../../database/database.js");
const {
  signUpNewAcc_sql,
  addNewPaymentDet_sql,
  signUpNewAdmin_sql,
} = require("./signUp_sql");
const { runCom } = require("../../configuration/generalFunc");

//funciton that creates a new account
const signUpNewAcc = (req, res, isAdmin) => {
  const userID = req.body.userID;
  const userType = req.body.userType;
  const userEmail = req.body.userEmail;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userAddress = req.body.userAddress;
  const userPass = req.body.userPass;
  const payMetID = req.body.payMetID;
  const cardNumber = req.body.cardNumber;
  const expire_Date = req.body.expire_Date;
  const ccv = req.body.ccv;
  //bcrypt that converts the password into a hash value
  bcrypt.hash(userPass, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    if (isAdmin == false) {
      db.run(
        signUpNewAcc_sql,
        [userID, userType, userEmail, firstName, lastName, userAddress, hash],
        (err) => {
          if (err) {
            res.json({ error: err.message });
            return;
          }
          //create a new account for normal user
          runCom(
            addNewPaymentDet_sql,
            [payMetID, cardNumber, userID, expire_Date, ccv, 10000],
            res,
            "New user has been added"
          );
        }
      );
    } else {
      //create a new admin account
      runCom(
        signUpNewAdmin_sql,
        [userID, userType, userEmail, firstName, lastName, userAddress, hash],
        res,
        "New Admin user has been added"
      );
    }
  });
};

module.exports = { signUpNewAcc };
