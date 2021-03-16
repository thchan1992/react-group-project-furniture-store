//Import all the necessary package
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./database.js");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./configure"));

//Import the local module

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
app.use(require("./login"));
app.use(require("./item"));
app.use(require("./signUp"));
