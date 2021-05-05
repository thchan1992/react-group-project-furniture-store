//Configuration for the CORS

var cors = require("cors");
var express = require("express");
var app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

module.exports = app;
