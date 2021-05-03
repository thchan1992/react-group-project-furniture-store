var db = require("../../database/database.js");
const { jwtMaker } = require("../../configuration/jwtConf");

const login = (sql, userEmail, userPass, req, res) => {
  db.all(sql, userEmail, (err, result) => {
    if (err) {
      res.json({ err: err });
      return;
    }
    if (result.length > 0) {
      jwtMaker(userPass, req, res, result);
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
