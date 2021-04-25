var bcrypt = require("bcrypt");
var saltRounds = 10;
const { runCom } = require("../../configuration/generalFunc");
const { updateUserPass_sql, updateUserDet_sql } = require("./user_sql");

const updateUserDet = (req, res) => {
  var userID = req.body.userID;
  var column = req.body.column;
  var change = req.body.change;
  if (column == "userPass") {
    bcrypt.hash(change, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        runCom(
          updateUserPass_sql,
          [hash, userID],
          res,
          "Personal details updated."
        );
      }
    });
  }
  // Set the new details into the database for any attributes different than password
  else {
    runCom(
      updateUserDet_sql(column),
      [change, userID],
      res,
      "Personal details updated"
    );
  }
};

module.exports = { updateUserDet };
