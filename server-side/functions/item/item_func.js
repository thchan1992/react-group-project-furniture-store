var db = require("../../database/database.js");
var multer = require("multer");
var fs = require("fs");
const { getAll, getOne, runCom } = require("../../configuration/generalFunc");

// multer to store the image uploaded from the front end
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //set the dictoary
    cb(null, "./image");
  },
  //create the file name
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

//create the upload function by using multer
const uploadImg = multer({ storage: storage });

//function that delete a picture from the server
const deleteImg = (sql, params, res) => {
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
        res.json({ error: err.message });
        return;
      } else {
        res.json({ message: "The picture has been deleted" });
      }
    });
  });
};

module.exports = { uploadImg, deleteImg, getAll, getOne, runCom };
