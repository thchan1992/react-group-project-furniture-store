var cors = require("cors");
var express = require("express");
var bodyParser = require("body-parser");
var db = require("../database/database.js");
var app = express();
var bcrypt = require("bcrypt");
var saltRounds = 10;
app.use(bodyParser.json());
app.use(cors());
app.use(require("../configuration/corsConf"));
const { regularJWT, adminJWT } = require("../configuration/jwtConf");
// const { sendAutoOrder } = require("./email/email.js");

// //get supplier detail
// const getSuppDet = (suppID, callback) => {
//   db.get("select * from suppliers where suppID = ?", suppID, (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     callback(result);
//   });
// };

// app.post("/suppliers/newOrder", adminJWT, (req, res) => {
//   const suppOrdID = req.body.suppOrdID;
//   const suppID = req.body.suppID;
//   const itemDetID = req.body.itemDetID;
//   const itemCatID = req.body.itemCatID;
//   const suppOrdQty = req.body.suppOrdQty;
//   const orderDate = req.body.orderDate;
//   const ordReceiveDate = req.body.ordReceiveDate;
//   const itemName = req.body.itemName;

//   getSuppDet(suppID, (supplier) => {
//     sendAutoOrder(supplier.suppEmail, supplier.suppName, itemName, suppOrdQty);
//   });

//   var params = [
//     suppOrdID,
//     suppID,
//     itemDetID,
//     itemCatID,
//     suppOrdQty,
//     orderDate,
//     ordReceiveDate,
//   ];

//   db.all(
//     "INSERT INTO suppOrder (suppOrdID, suppID, itemDetID, itemCatID, suppOrdQty, orderDate, ordReceiveDate) VALUES (?, ?, ?, ?, ?, ?, ?)",
//     params,
//     (err) => {
//       if (err) {
//         res.json({ error: err.message });
//         return;
//       }
//     }
//   );
// });

// // Fetch a list of all the orders made to the suppliers (orders history)
// app.post("/suppliers/orderHistory", adminJWT, (req, res) => {
//   db.all("SELECT * FROM suppOrder", (err, result) => {
//     if (err) {
//       res.json({ error: err.message });
//       return;
//     } else {
//       res.json({ result });
//     }
//   });
// });

//-----
// the update stock
// app.put("/suppliers/updateStock", (req, res) => {
//   var itemDetID = req.body.itemDetID;
//   db.get(
//     "SELECT itemQty from itemDetails WHERE itemDetID = ?",
//     itemDetID,
//     (err, result) => {
//       if (err) {
//         res.json({ error: err.message });
//         return;
//       } else {
//         const itemQty = result.itemQty;
//         var ordReceiveDate = req.body.ordReceiveDate;
//         var suppOrdID = req.body.suppOrdID;
//         var suppParams = [ordReceiveDate, suppOrdID];
//         var suppOrdQty = req.body.suppOrdQty;
//         var newQty = itemQty + suppOrdQty;
//         var itemParams = [newQty, itemDetID];
//         db.run(
//           "UPDATE suppOrder SET ordReceiveDate = ? WHERE suppOrdID = ?",
//           suppParams,
//           (err) => {
//             if (err) {
//               res.json({ error: err.message });
//               return;
//             } else {
//               db.run(
//                 "UPDATE itemDetails SET itemQty = ? WHERE itemDetID =?",
//                 itemParams,
//                 (err) => {
//                   if (err) {
//                     res.json({ error: err.message });
//                     return;
//                   } else {
//                     res.json({ message: "Date updated." });
//                   }
//                 }
//               );
//             }
//           }
//         );
//       }
//     }
//   );
// });

// Fetch the details of a specific order
// app.get("/suppliers/orderHistory/:suppOrdID", (req, res) => {
//   var suppOrdID = req.params.suppOrdID;
//   db.all(
//     "SELECT * FROM suppOrder WHERE suppOrdID = ?",
//     suppOrdID,
//     (err, result) => {
//       if (err) {
//         res.json({ error: err.message });
//         return;
//       }
//       res.json({ result });
//     }
//   );
// });

//Update the receive date
// app.put("/suppliers/orderReceived", (req, res) => {
//   var suppOrdID = req.body.suppOrdID;
//   var change = req.body.change;
//   var params = [change, suppOrdID];

//   db.all(
//     `UPDATE suppOrder SET ordReceiveDate = ? WHERE suppOrdID = ?`,
//     params,
//     (err) => {
//       if (err) {
//         res.json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: "Date updated.",
//       });
//     }
//   );
// });

module.exports = app;
