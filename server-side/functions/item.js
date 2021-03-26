var express = require("express");
var app = express();

// var cors = require("cors");
// app.use(cors());
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

var db = require("./../database/database.js");

app.use(require("../configuration/corsConf"));

var jwt = require("jsonwebtoken");
const { regularJWT, adminJWT } = require("./../configuration/jwtConf");

var multer = require("multer");
var fs = require("fs");
var path = require("path");

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//API request to upload the Image of the product
app.post("/item/uploadImage/", adminJWT, upload.single("image"), (req, res) => {
  const fileName = req.file.filename;
  //send the file name to the front end
  res.json({ fileName: fileName });
});

//API request to add the item
app.post("/item/addItem/", adminJWT, (req, res) => {
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

//delete the item picture in the backend
app.delete("/deletePic/:itemDetID", adminJWT, (req, res) => {
  const sql = "SELECT itemUrl FROM itemDetails WHERE itemDetID = ?";
  const params = req.params.itemDetID;

  db.get(sql, params, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    //remove the first 20th string: http://localhost:8080
    const str = result.itemUrl.substr(21);
    const path = "./image/" + str;
    fs.unlink(path, (err) => {
      if (err) {
        res.json({ error: err });
        return;
      } else {
        res.json({ message: "The picture has been deleted" });
      }
    });
  });
});

//A search API
app.get("/item/search/:sorting/:column/:keyword", (req, res) => {
  var sorting = req.params.sorting;
  var column = req.params.column;
  var sql =
    "SELECT itemDetails.itemDetID, itemDetails.itemCatID, itemPrice, itemThreshold, itemQty, itemName, itemDesp, itemCategory.itemCatID, itemCatName, itemUrl FROM itemDetails INNER JOIN itemCategory ON itemCategory.itemCatID = itemDetails.itemCatID WHERE itemName LIKE ? AND itemThreshold != 0 ORDER BY " +
    column +
    " " +
    sorting;

  var keyword = "%" + req.params.keyword + "%";
  db.all(sql, keyword, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ result });
  });
});

//fetch a list of furniture
app.get("/item/showItems/:sorting/:column/:itemCatName/", (req, res) => {
  //decide whether it is in "desc" or "asc" order
  var sorting = req.params.sorting;
  //sorting based on what column (itemPrice, itemName or suppName)
  var column = req.params.column;
  //a list of items based on the catergory
  var itemCatName = req.params.itemCatName;

  var sql =
    "SELECT itemDetails.itemDetID, itemDetails.itemCatID, itemPrice, itemThreshold, itemQty, itemName, itemDesp, itemCategory.itemCatID, itemCatName, itemUrl FROM itemDetails INNER JOIN itemCategory ON itemCategory.itemCatID = itemDetails.itemCatID WHERE itemCatName = ? AND itemThreshold != 0 ORDER BY " +
    column +
    " " +
    sorting;

  //commet it out for later use after we build the auto order function
  // var sql =
  //   "SELECT itemDetails.itemDetID, itemDetails.itemCatID, itemPrice, itemThreshold, itemQty, itemName, itemDesp, suppliers.suppID, suppName, itemCategory.itemCatID, itemCatName FROM itemDetails INNER JOIN itemCategory ON itemCategory.itemCatID = itemDetails.itemCatID INNER JOIN suppOrder ON itemDetails.itemDetID = suppOrder.itemDetID INNER JOIN suppliers ON suppOrder.suppID = suppliers.suppID WHERE itemCatName = ? ORDER BY " +
  //   column +
  //   " " +
  //   sorting;

  db.all(sql, itemCatName, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({ result });
  });
});

//update a furniture
app.put("/item/editProducts", adminJWT, (req, res) => {
  var column = req.body.column;
  var itemDetID = req.body.itemDetID;
  var change = req.body.change;
  var params = [change, itemDetID];
  db.all(
    `UPDATE itemDetails SET ${column} = ? WHERE itemDetID = ?`,
    params,
    (err) => {
      if (err) {
        res.json({ error: res.message });
        return;
      }
      res.json({
        message: "The item has been edited",
      });
    }
  );
});

// Create a new category
app.post("/item/addCater", (req, res) => {
  const itemCatID = req.body.itemCatID;
  const itemCatName = req.body.itemCatName;
  var params = [itemCatID, itemCatName];

  db.all(
    "INSERT INTO itemCategory (itemCatID, itemCatName) VALUES (?, ?)",
    params,
    (err) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ message: "Category successfully added!" });
    }
  );
});

module.exports = app;
