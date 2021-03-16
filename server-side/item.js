var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var db = require("./database.js");
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var bcrypt = require("bcrypt");
var saltRounds = 10;
var cookieParser = require("cookie-parser");
var session = require("express-session");
var jwt = require("jsonwebtoken");
var multer = require("multer");
var fs = require("fs");
var path = require("path");
const { regularJWT, adminJWT } = require("./JWT");

//Add a new furniture to the database
app.use(express.static("image"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

//fetch a list of furniture
app.get("/showItems/:sorting/:column/:itemCatName", (req, res) => {
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
