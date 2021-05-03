const nodemailer = require("nodemailer");
var db = require("../../database/database.js");
const {
  checkThreshold_sql,
  addNewSuppOrd_sql,
  updateStock_sql,
} = require("./email_sql");

//auto mail function
const autoMail_func = (userID) => {
  // sql to check which item is below the threshold
  db.all(checkThreshold_sql, userID, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      //get the list of the products that need to be ordered
      result.map((item) => {
        //in each loop, call this function to send an item to the supplier
        sendAutoOrder(item.suppEmail, item.suppName, item.itemName, 100);
        //then update the stock
        updateStock(item.itemDetID);
        //create a new suppOrder
        updateSuppOrd(item.suppID, item.itemDetID, item.itemCatID, 100);
      });
    }
    //map function to send email to each supplier
  });
};

//set up the transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: "onlinefurniture.group47@gmail.com", pass: "uwlgroup47" },
});

//send the email
const sendAutoOrder = (email, suppName, itemName, suppOrdQty) => {
  transporter.sendMail(
    mailOpt(email, suppName, itemName, suppOrdQty),
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email sent: ", info);
      }
    }
  );
};

//add new supplier order
const updateSuppOrd = (suppID, itemDetID, itemCatID, suppOrdQty) => {
  const suppOrdID = new Date().getTime();
  const today = new Date();
  const orderDate =
    today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
  const ordReceiveDate = orderDate;
  const param = [
    suppOrdID,
    suppID,
    itemDetID,
    itemCatID,
    suppOrdQty,
    orderDate,
    ordReceiveDate,
  ];
  db.run(addNewSuppOrd_sql, param);
};

//set up the email content
const mailOpt = (email, suppName, itemName, suppOrdQty) => {
  return {
    from: "onlinefurniture.group47@gmail.com",
    to: email,
    subject: "Auto Order from CHKMV",
    text:
      "Hi " +
      suppName +
      ", we would like to order " +
      suppOrdQty +
      " of " +
      itemName +
      " from you! Regards CHKMV",
  };
};

// update the stock after sending the email
const updateStock = (itemDetID) => {
  db.run(updateStock_sql, itemDetID);
};

module.exports = { autoMail_func, sendAutoOrder };
