//Import all the necessary package
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

//Import the local module
app.use(require("./login"));
app.use(require("./item"));
app.use(require("./signUp"));

// Port
var HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

// indicate the service is working.
app.get("/", (req, res, next) => {
  res.json({ message: "Server running" });
});

app.use(express.json());
//configure the cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
