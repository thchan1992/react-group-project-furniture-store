var db = require("../../database/database.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const login = (sql, userEmail, userPass, req, res) => {
  db.all(sql, userEmail, (err, result) => {
    if (err) {
      res.json({ err: err });
      return;
    }
    if (result.length > 0) {
      //bcrypt decode the userPass and check whether it matches the password from the front end.
      bcrypt.compare(userPass, result[0].userPass, (error, response) => {
        if (response) {
          const userID = result[0].userID;
          const userEmail = result[0].userEmail;
          const userType = result[0].userType;
          //create the token by using the userID, userEmail and userType
          const token = jwt.sign({ userID, userEmail, userType }, "Group47", {
            // expiresIn: 10,
            expiresIn: 60 * 60 * 24,
          });
          //create a session
          req.session.user = result;
          //return the token back to the front.
          res.json({ auth: true, token: token, result: result });
        } else {
          res.send({ auth: false, message: "Wrong username or password" });
        }
      });
    } else {
      res.send({ auth: false, message: "User doesn't exist" });
    }
  });
};

const loginSess = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

module.exports = { login, loginSess, logout };
