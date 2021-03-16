var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var db = require("./database.js");
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var jwt = require("jsonwebtoken");
var multer = require("multer");
var fs = require("fs");
var path = require("path");
const { regularJWT, adminJWT } = require("./JWT");

app.use(express.static("image"));

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

//API request to upload the Image of the product
app.post("/item/uploadImage/", upload.single("image"), (req, res) => {
  const fileName = req.file.filename;
  //send the file name to the front end
  res.json({ fileName: fileName });
});

//API request to add the item
app.post("/item/addItem/", (req, res) => {
  const itemDetID = req.body.itemDetID;
  const itemCatID = req.body.itemCatID;
  const itemPrice = req.body.itemPrice;
  const itemThreshold = req.body.itemThreshold;
  const itemQty = req.body.itemQty;
  const itemName = req.body.itemName;
  const itemDesp = req.body.itemDesp;
  const itemUrl = req.body.itemUrl;

  var sql =
    "INSERT INTO itemDetails (itemDetID, itemCatID, itemPrice, itemThreshold, itemQty, itemName, itemDesp, itemUrl) VALUES (?,?,?,?,?,?,?,?)";

  var params = [
    itemDetID,
    itemCatID,
    itemPrice,
    itemThreshold,
    itemQty,
    itemName,
    itemDesp,
    itemUrl,
  ];
  db.run(sql, params, function (err) {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ message: "New item has been added" });
  });
});

//fetch a list of furniture category
app.get("/item/showCater", (req, res) => {
  var sql = "SELECT * FROM itemCategory";
  db.all(sql, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ result });
  });
});

//fetch a list of furniture
app.get("/item/showItems/:sorting/:column/:itemCatName", (req, res) => {
  //decide whether it is in "desc" or "asc" order
  var sorting = req.params.sorting;
  //sorting based on what column (itemPrice, itemName or suppName)
  var column = req.params.column;
  //a list of items based on the catergory
  var itemCatName = req.params.itemCatName;
  var sql =
    "SELECT itemDetails.itemDetID, itemDetails.itemCatID, itemPrice, itemThreshold, itemQty, itemName, itemDesp, suppliers.suppID, suppName, itemCategory.itemCatID, itemCatName FROM itemDetails INNER JOIN itemCategory ON itemCategory.itemCatID = itemDetails.itemCatID INNER JOIN suppOrder ON itemDetails.itemDetID = suppOrder.itemDetID INNER JOIN suppliers ON suppOrder.suppID = suppliers.suppID WHERE itemCatName = ? ORDER BY " +
    column +
    " " +
    sorting;

  db.all(sql, itemCatName, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ result });
  });
});

//update a furniture
// to be coded by Viola

module.exports = app;
