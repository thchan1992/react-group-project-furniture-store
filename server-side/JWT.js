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

const adminJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Token not found");
  } else {
    jwt.verify(token, "Group47", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "you failed to authenticate1" });
      } else {
        if (decode.userType == "A") {
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

module.exports = { regularJWT, adminJWT };
