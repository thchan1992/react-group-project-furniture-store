const nodemailer = require("nodemailer");
var db = require("../../database/database.js");
const {
  checkThreshold_sql,
  addNewSuppOrd_sql,
  updateStock_sql,
} = require("./email_sql");

//auto mail function
const autoMail_func = (userID) => {
  // sql to check which item is below the threshold and get the list of the products that need to be ordered
  db.all(checkThreshold_sql, userID, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      //apply map function on the list
      result.map((item) => {
        //in each loop, call this function to send an item to the supplier
        sendAutoOrder(item.suppEmail, item.suppName, item.itemName, 100);
        //then update the stock
        updateStock(item.itemDetID);
        //create a new suppOrder
        updateSuppOrd(item.suppID, item.itemDetID, item.itemCatID, 100);
      });
    }
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

//function that make the order date
const dateMaker = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

//add new supplier order
const updateSuppOrd = (suppID, itemDetID, itemCatID, suppOrdQty) => {
  const suppOrdID = new Date().getTime();
  const orderDate = dateMaker(new Date());
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
