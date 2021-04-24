var jwt = require("jsonwebtoken");

//set up the JWT for all users including admin, this token will be used for all purposes
const regularJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Token not found");
  } else {
    jwt.verify(token, "Group47", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "you failed to authenticate" });
      } else {
        req.userID = decoded.userID;
        next();
      }
    });
  }
};

const checkUserID = (req, res, userID, func) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, "Group47", (err, decoded) => {
    console.log("2 ", decoded.userID);
    if (err) {
      res.json({
        auth: false,
        message:
          "you failed to authenticate, please do not pretend someone you are not.(err)",
      });
    } else {
      if (userID == decoded.userID) {
        func();
      } else {
        res.json({
          auth: false,
          message:
            "you failed to authenticate, please do not pretend someone you are not.",
        });
      }
    }
  });
};

//This JWT is speically for admin so the admin can modify on the products
const adminJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Token not found");
  } else {
    jwt.verify(token, "Group47", (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: "you failed to authenticate1",
          error: err,
        });
      } else {
        if (decoded.userType == "A") {
          req.userID = decoded.userID;
          next();
        } else
          res.json({
            auth: false,
            message: "you are not admin.",
          });
      }
    });
  }
};

module.exports = { regularJWT, adminJWT, checkUserID };
