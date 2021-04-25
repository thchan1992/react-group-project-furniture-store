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

app.use(require("./functions/login/login"));
app.use(require("./functions/item/item"));
app.use(require("./functions/signUp/signUp"));
app.use(require("./functions/supplier/supplier"));
app.use(require("./functions/user/user"));
app.use(require("./functions/suppliersOrders"));
app.use(require("./functions/basket/basket"));
app.use(require("./functions/payment/payment"));
app.use(require("./functions/sales/sales"));
