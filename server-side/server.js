//Import all the necessary package
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

var express = require("express");
var app = express();
app.use(require("./configuration/corsConf"));
app.use(express.static("image"));

// Port
var HTTP_PORT = 8080;
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
// indicate the service is working.
app.get("/", (req, res, next) => {
  res.json({ message: "Server running" });
});

// app.use(express.json());

app.use(require("./functions/login"));
app.use(require("./functions/item"));
app.use(require("./functions/signUp"));
app.use(require("./functions/supplierDet"));
app.use(require("./functions/userDetail"));
app.use(require("./functions/suppliersOrders"));
app.use(require("./functions/basket"));
app.use(require("./functions/payment"));
app.use(require("./functions/sales"));
