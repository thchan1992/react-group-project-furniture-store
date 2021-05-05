var db = require("../../database/database.js");
const { jwtMaker } = require("../../configuration/jwtConf");

//function that handle the log in
const login = (sql, userEmail, userPass, req, res) => {
  db.all(sql, userEmail, (err, result) => {
    if (err) {
      res.json({ err: err });
      return;
    }
    if (result.length > 0) {
      //after getting the user detail, pass all the information to the jwtMaker to create JWT and return to the users
      jwtMaker(userPass, req, res, result);
    } else {
      res.send({ auth: false, message: "User doesn't exist" });
    }
  });
};

const loginSess = (req, res) => {
  if (req.session.user) {
    //return the session, and user file
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

const logout = (req, res) => {
  //clear the session in the server
  req.session.destroy();
  res.sendStatus(200);
};

module.exports = { login, loginSess, logout };
