var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

//get the jwt secret from the server configuration file: .env
const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;

//functions that make the jwt when users log in
const jwtMaker = (userPass, req, res, result) => {
  //bcrypt decode the userPass and check whether it matches the password from the front end.
  bcrypt.compare(userPass, result[0].userPass, (error, response) => {
    if (response) {
      const userID = result[0].userID;
      const userEmail = result[0].userEmail;
      const userType = result[0].userType;
      //create the token by using the userID, userEmail and userType
      const token = jwt.sign({ userID, userEmail, userType }, jwtSecretKey, {
        //token expires in 24 hours
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
};

//set up the JWT for all users including admin, this token will be used for all purposes
const regularJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Token not found");
  } else {
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "you failed to authenticate" });
      } else {
        req.userID = decoded.userID;
        next();
      }
    });
  }
};

//a function that checks whether the normal user is making a request for his own data.
//if they are asking for someone else data, the request will be rejected
const checkUserID = (req, res, userID, func) => {
  const token = req.headers["x-access-token"];
  console.log("token", req.headers["x-access-token"]);
  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      res.json({
        auth: false,
        message:
          "you failed to authenticate, you do not have access to someone else data.(err)",
      });
    } else {
      if (userID == decoded.userID) {
        console.log("pass");
        func();
      } else {
        console.log("userID::", userID);
        console.log("decode::", decoded.userID);
        res.json({
          auth: false,
          message:
            "you failed to authenticate, you do not have access to someone else data.",
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
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: "you failed to authenticate1",
          error: err,
        });
      } else {
        //it decoded with the userType - "A"
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

module.exports = { regularJWT, adminJWT, checkUserID, jwtMaker };
